use crate::{config::Sword, utils::dirs};
use anyhow::{bail, Result};
use once_cell::sync::OnceCell;
use parking_lot::RwLock;
use std::sync::Arc;
use tauri::api::process::{Command, CommandChild, CommandEvent};

#[derive(Debug, Clone)]
pub struct Core {
    pub core_handler: Arc<RwLock<Option<CommandChild>>>,
}

impl Core {
    pub fn global() -> &'static Core {
        static SERVICE: OnceCell<Core> = OnceCell::new();

        SERVICE.get_or_init(|| Core {
            core_handler: Arc::new(RwLock::new(None)),
        })
    }

    /// 启动核心
    pub fn run_core(&self) -> Result<()> {
        let mut core_handler = self.core_handler.write();

        core_handler.take().map(|ch| {
            let _ = ch.kill();
        });

        let config_dir = dirs::sing_box_dir();
        let config_dir = config_dir
            .as_os_str()
            .to_str()
            .ok_or(anyhow::anyhow!("failed to get sing-box config dir path"))?;

        fn use_core_path(name: &str) -> String {
            #[cfg(target_os = "windows")]
            return format!("core\\{name}");
            #[cfg(not(target_os = "windows"))]
            return format!("core/{name}");
        }

        let core_name = Sword::global()
            .core_name()
            .ok_or(anyhow::anyhow!("failed to get core name"))?;
        let cmd = Command::new_sidecar(use_core_path(&core_name))?;

        #[allow(unused_mut)]
        let (mut rx, cmd_child) = cmd
            .args(["run", "-c", "config.json", "-D", config_dir])
            .spawn()?;

        *core_handler = Some(cmd_child);

        log::info!(target: "app", "run core {core_name}");

        #[cfg(feature = "stdout-log")]
        tauri::async_runtime::spawn(async move {
            while let Some(event) = rx.recv().await {
                match event {
                    CommandEvent::Terminated(_) => break,
                    CommandEvent::Error(err) => log::error!("{err}"),
                    CommandEvent::Stdout(line) => log::info!("{line}"),
                    CommandEvent::Stderr(line) => log::info!("{line}"),
                    _ => {}
                }
            }
        });

        Ok(())
    }

    /// 获取所有可执行的文件
    pub fn list_core() -> Result<Vec<String>> {
        let core_dir = dirs::core_dir()?;

        let list = std::fs::read_dir(core_dir)?
            .filter_map(|e| e.ok())
            .filter(|e| e.file_type().map_or(false, |f| f.is_file()))
            .map(|e| match e.path().file_stem() {
                Some(stem) => stem.to_os_string().into_string().ok(),
                None => None,
            })
            .filter_map(|e| e)
            .collect();

        Ok(list)
    }

    pub fn change_core(&self, name: String) -> Result<()> {
        let core_dir = dirs::core_dir()?;

        #[cfg(windows)]
        let core_path = format!("{name}.exe");
        #[cfg(not(windows))]
        let core_path = name.clone();
        let core_path = core_dir.join(core_path);

        if !core_path.exists() {
            bail!("core executable file not exists");
        }

        let sword = Sword::global();
        let mut config = sword.config.write();
        config.core_name = Some(name);
        drop(config);
        sword.save_config()?;

        self.run_core()?;
        Ok(())
    }
}