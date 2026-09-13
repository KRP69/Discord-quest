/**
 * @name CORIQuestDashboard
 * @author CORI
 * @description CORI Liquid Hub: v15.1.5 (Deep Webpack Traversal VC Joiner)
 * @version 16.0.0
 * @updateUrl https://discord.gg/c2h
 */

module.exports = class CORIQuestDashboard {
    start() {
        const _k = ["C", "O", "R", "I"].join("");
        const CORICode = this.start.toString();
        if (this.constructor.name !== `${_k}QuestDashboard` || typeof BdApi === "undefined" || !CORICode.includes("CORIEngineRunning")) {
            console.error("%c[ CORI SECURITY ] CODE TAMPERING DETECTED! CORRUPTING SYSTEM...", "color: red; font-size: 20px; font-weight: bold;");
            window.CORIEngineRunning = "CORRUPTED"; throw new Error("CORI_SECURITY_LOCKDOWN");
        }

        if (window.CORIEngineRunning === true) return;
        window.CORIEngineRunning = true;
        
        window.CORIGrindToggle = false; window.CORIMode = 'SYMBIOTIC'; window.CORIVideoApproval = false; window.CORIDeafenToggle = false; 
        window.CORICurrentProg = 0; window.CORITotalSeconds = 0; window.CORICurrentSecondsDone = 0; window.CORIUpdateAvailable = false;
        console.clear();
        
        const CORI_HUB_VER = "16.0.0";
        const CORI_REPO_BASE = "https://raw.githubusercontent.com/CORI-1/CORI-Quest-Tool/main/";
        const CORI_HUB_URL = CORI_REPO_BASE + "CORI.plugin.js";
        const CORI_QUEST_URL = CORI_REPO_BASE + "QuestEngine.js";
        const CORI_DEAFEN_URL = CORI_REPO_BASE + "DeafenEngine.js";

        const CUSTOM_LOGO_URL = "https://i.ibb.co/tp0Cpw9B/Arnold-B-cklin.png"; 
        const DEVELOPER_ID = "784733687039131678"; 

        const CORILog = (app, msg, type = "info") => {
            const colors = { info: "#7C3AED", success: "#00C2A8", warn: "#F6B73C", error: "#FF6B9A", brand: "#A78BFA", finish: "#2DD4BF" };
            const color = colors[type] || colors.info;
            console.log(`%c[ ${_k} | ${app} ]%c ${msg}`, `color: #000; background: ${color}; font-weight: bold; border-radius: 4px; padding: 2px 6px;`, `color: ${color}; font-weight: 500; padding-left: 5px;`);

            const logBox = document.getElementById(app === 'QUEST' ? 'CORI-terminal-quest' : 'CORI-terminal-deafen');
            if (logBox) {
                const time = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute:'2-digit', second:'2-digit' });
                const logEntry = document.createElement('div'); logEntry.style.marginBottom = "6px";
                logEntry.style.animation = "CORIFadeIn 0.3s ease forwards";
                logEntry.innerHTML = `<span style="color: rgba(255,255,255,0.3); font-size: 11px; font-weight: 500; margin-right: 6px;">[${time}]</span> <span style="color: ${color}; font-weight: 500; text-shadow: 0 0 8px ${color}40;">${msg}</span>`;
                logBox.appendChild(logEntry); logBox.scrollTop = logBox.scrollHeight;
            }
        };

        const CORIShowToast = (title, message, type = 'info') => {
            const container = document.getElementById('CORI-toast-container');
            if (!container) return;
            
            const toast = document.createElement('div');
            toast.className = `CORI-toast toast-${type}`;
            
            let icon = '';
            if (type === 'success') icon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="width:14px; height:14px;"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
            else if (type === 'error') icon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="width:14px; height:14px;"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;
            else icon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="width:14px; height:14px;"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`;

            toast.innerHTML = `<div class="CORI-toast-icon">${icon}</div><div class="CORI-toast-text"><span style="color:rgba(255,255,255,0.6); font-size: 11px; display:block; margin-bottom: 2px;">${title}</span><span style="font-size: 13px;">${message}</span></div>`;
            
            container.appendChild(toast);
            
            setTimeout(() => toast.classList.add('show'), 10);
            setTimeout(() => {
                toast.classList.remove('show');
                setTimeout(() => toast.remove(), 500);
            }, 3500);
        };

        const CORIInjectUI = () => {
            if (document.getElementById('CORI-overlay')) return;
            const style = document.createElement('style'); style.id = "CORI-styles";
            style.innerHTML = `
                @import url('https://fonts.cdnfonts.com/css/sf-pro-display');
                
                @keyframes CORIFadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
                @keyframes CORIScaleUp { from { opacity: 0; transform: scale(0.92) translateY(10px); } to { opacity: 1; transform: scale(1) translateY(0); } }
                @keyframes CORIPulseUpdate { 0% { box-shadow: 0 0 0 0 rgba(50, 173, 230, 0.4); } 70% { box-shadow: 0 0 0 10px rgba(50, 173, 230, 0); } 100% { box-shadow: 0 0 0 0 rgba(50, 173, 230, 0); } }

                #CORI-overlay { 
                    position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
                    background: rgba(5, 5, 8, 0.6); backdrop-filter: blur(24px) saturate(160%); -webkit-backdrop-filter: blur(24px) saturate(160%);
                    z-index: 9999999; display: flex; flex-direction: column; justify-content: center; align-items: center;
                    opacity: 0; pointer-events: none; transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1);
                    font-family: "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif; color: #fff;
                }
                #CORI-overlay.CORI-open { opacity: 1; pointer-events: auto; }

                #CORI-main-dashboard {
                    width: 760px; max-width: 90vw; display: flex; flex-direction: column; gap: 20px;
                    opacity: 0; transform: scale(0.95); transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
                }
                #CORI-overlay.CORI-open #CORI-main-dashboard { opacity: 1; transform: scale(1); }

                .CORI-top-bar {
                    display: flex; justify-content: space-between; align-items: center;
                    background: linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%);
                    border-top: 1px solid rgba(255, 255, 255, 0.15); border-left: 1px solid rgba(255, 255, 255, 0.1);
                    border-right: 1px solid rgba(0, 0, 0, 0.2); border-bottom: 1px solid rgba(0, 0, 0, 0.2);
                    border-radius: 100px; padding: 10px 18px; box-shadow: 0 15px 35px rgba(0,0,0,0.4), inset 0 1px 1px rgba(255,255,255,0.1);
                }
                .CORI-nav-group { display: flex; gap: 8px; align-items: center; }
                
                .CORI-nav-item { 
                    display: flex; align-items: center; gap: 8px; padding: 10px 22px; border-radius: 100px; cursor: pointer; 
                    background: transparent; border: 1px solid transparent; box-sizing: border-box;
                    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); color: rgba(255,255,255,0.5); font-weight: 600; font-size: 14.5px;
                }
                .CORI-nav-item:hover { color: #fff; background: rgba(255,255,255,0.05); }
                .CORI-nav-item:active { transform: scale(0.95); }
                
                .CORI-nav-item[data-target="quest"].active {
                    background: rgba(0, 194, 168, 0.15); color: #00C2A8; border: 1px solid rgba(0, 194, 168, 0.2); box-shadow: 0 4px 15px rgba(0,0,0,0.2), inset 0 1px 3px rgba(0, 194, 168, 0.3);
                }
                .CORI-nav-item[data-target="deafen"].active {
                    background: rgba(167, 139, 250, 0.15); color: #A78BFA; border: 1px solid rgba(167, 139, 250, 0.2); box-shadow: 0 4px 15px rgba(0,0,0,0.2), inset 0 1px 3px rgba(167, 139, 250, 0.3);
                }
                .CORI-nav-item svg { width: 18px; height: 18px; transition: 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
                .CORI-nav-item.active svg { transform: scale(1.15); }

                #CORI-update-hub { 
                    display: none; align-items: center; gap: 8px; padding: 10px 20px; font-size: 13.5px; font-weight: 700;
                    background: linear-gradient(135deg, rgba(124, 58, 237, 0.2), rgba(0, 194, 168, 0.05)); color: #A78BFA; 
                    border: 1px solid rgba(167, 139, 250, 0.4); border-radius: 100px; cursor: pointer;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.3), inset 0 1px 2px rgba(255,255,255,0.2);
                    animation: CORIPulseUpdate 2s infinite; transition: all 0.3s;
                }
                #CORI-update-hub:hover { background: rgba(124, 58, 237, 0.3); color: #fff; transform: translateY(-2px); }
                #CORI-update-hub svg { width: 16px; height: 16px; }

                .CORI-close-btn {
                    width: 38px; height: 38px; border-radius: 50%; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
                    display: flex; justify-content: center; align-items: center; cursor: pointer; font-size: 14px; color: rgba(255,255,255,0.6); transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                }
                .CORI-close-btn:hover { background: rgba(255,45,85,0.9); color: #fff; transform: rotate(90deg) scale(1.1); border-color: rgba(255,255,255,0.4); box-shadow: 0 4px 15px rgba(255,45,85,0.4); }

                .CORI-view { display: none; grid-template-columns: 1fr 1fr; gap: 20px; }
                .CORI-view.active { display: grid; }
                
                .CORI-glass-card {
                    background: linear-gradient(135deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.01) 100%);
                    backdrop-filter: blur(30px) saturate(200%); -webkit-backdrop-filter: blur(30px) saturate(200%);
                    border-top: 1px solid rgba(255, 255, 255, 0.15); border-left: 1px solid rgba(255, 255, 255, 0.1);
                    border-right: 1px solid rgba(0, 0, 0, 0.3); border-bottom: 1px solid rgba(0, 0, 0, 0.3);
                    border-radius: 28px; padding: 26px;
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.08);
                    transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1); display: flex; flex-direction: column; gap: 16px;
                }
                .CORI-glass-card:hover { transform: translateY(-3px); box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5), inset 0 1px 2px rgba(255, 255, 255, 0.15); }
                .CORI-card-full { grid-column: 1 / -1; }

                .theme-SYMBIOTIC .CORI-mode-indicator { color: #00C2A8; text-shadow: 0 0 12px rgba(0,194,168,0.5); }
                .theme-HARMONY .CORI-glass-card { 
                    background: linear-gradient(135deg, rgba(167, 139, 250, 0.06) 0%, rgba(0, 0, 0, 0.2) 100%);
                    border-top: 1px solid rgba(167, 139, 250, 0.3); border-left: 1px solid rgba(167, 139, 250, 0.15);
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5), inset 0 1px 10px rgba(167, 139, 250, 0.1);
                }
                .theme-HARMONY .CORI-mode-indicator { color: #A78BFA; text-shadow: 0 0 15px rgba(167,139,250,0.7); }
                .theme-deafen-on .CORI-deafen-card {
                    background: linear-gradient(135deg, rgba(167, 139, 250, 0.06) 0%, rgba(0, 0, 0, 0.2) 100%);
                    border-top: 1px solid rgba(167, 139, 250, 0.3); border-left: 1px solid rgba(167, 139, 250, 0.15);
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5), inset 0 1px 10px rgba(167, 139, 250, 0.1);
                }

                .CORI-card-header { display: flex; justify-content: space-between; align-items: center; }
                .CORI-card-title { font-size: 16px; font-weight: 600; color: rgba(255,255,255,0.9); display: flex; align-items: center; gap: 10px; }
                .CORI-card-title svg { color: rgba(255,255,255,0.5); }

                #CORI-deafen-mic { width: 24px; height: 24px; transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1); transform-origin: center; }
                .theme-deafen-on #CORI-deafen-mic { color: #A78BFA; filter: drop-shadow(0 0 12px rgba(167,139,250,0.8)); transform: scale(1.05); }

                .CORI-toggle { position: relative; display: inline-block; width: 52px; height: 30px; }
                .CORI-toggle input { opacity: 0; width: 0; height: 0; }
                .CORI-slider { 
                    position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; 
                    background-color: rgba(0,0,0,0.5); border-radius: 34px; 
                    box-shadow: inset 0 2px 8px rgba(0,0,0,0.8), inset 0 0 0 1px rgba(255,255,255,0.08);
                    transition: .4s cubic-bezier(0.16, 1, 0.3, 1); 
                }
                .CORI-slider:before { 
                    position: absolute; content: ""; height: 22px; width: 22px; left: 4px; bottom: 4px; 
                    background-color: #aaa; border-radius: 50%; box-shadow: 0 2px 6px rgba(0,0,0,0.5);
                    transition: .4s cubic-bezier(0.16, 1, 0.3, 1); 
                }
                input:checked + .CORI-slider:before { background-color: #fff; transform: translateX(22px); box-shadow: 0 2px 8px rgba(0,0,0,0.6), inset 0 -2px 4px rgba(0,0,0,0.1); }
                input:active + .CORI-slider:before { width: 28px; }
                input:checked:active + .CORI-slider:before { transform: translateX(16px); }

                .theme-SYMBIOTIC input:checked + .CORI-slider { background-color: rgba(0,194,168,0.8); box-shadow: inset 0 2px 6px rgba(0,0,0,0.3), 0 0 15px rgba(0,194,168,0.4); border-color: rgba(0,194,168,0.4); }
                .theme-HARMONY input:checked + .CORI-slider { background-color: rgba(167,139,250,0.8); box-shadow: inset 0 2px 6px rgba(0,0,0,0.3), 0 0 15px rgba(167,139,250,0.4); border-color: rgba(167,139,250,0.4); }
                .theme-deafen-on input:checked + .CORI-slider { background-color: rgba(167,139,250,0.8); box-shadow: inset 0 2px 6px rgba(0,0,0,0.3), 0 0 15px rgba(167,139,250,0.4); border-color: rgba(167,139,250,0.4); }

                #CORI-mode-btn {
                    padding: 8px 18px; font-size: 13px; font-weight: 700; letter-spacing: 0.5px; text-transform: uppercase;
                    background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 14px; cursor: pointer; color: #fff; transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                    box-shadow: inset 0 1px 1px rgba(255,255,255,0.1);
                }
                .theme-SYMBIOTIC #CORI-mode-btn:hover { background: rgba(0,194,168,0.2); border-color: rgba(0,194,168,0.4); color: #00C2A8; text-shadow: 0 0 8px rgba(0,194,168,0.5); transform: translateY(-2px); }
                .theme-HARMONY #CORI-mode-btn { background: rgba(167,139,250,0.15); border-color: rgba(167,139,250,0.5); color: #A78BFA; text-shadow: 0 0 10px rgba(167,139,250,0.6); box-shadow: 0 4px 15px rgba(167,139,250,0.2); }
                .theme-HARMONY #CORI-mode-btn:hover { background: rgba(167,139,250,0.3); transform: translateY(-2px); }
                #CORI-mode-btn:active { transform: scale(0.95); }

                .CORI-label { font-size: 12.5px; color: rgba(255,255,255,0.4); text-transform: uppercase; letter-spacing: 0.5px; font-weight: 700; margin-bottom: 6px; display: block; }
                .CORI-value { font-size: 16px; font-weight: 600; color: #fff; margin-bottom: 8px; }
                .CORI-eta-badge { background: rgba(0,0,0,0.5); padding: 5px 12px; border-radius: 10px; font-family: "SF Mono", monospace; font-size: 13.5px; font-weight: 600; border: 1px solid rgba(255,255,255,0.05); color: rgba(255,255,255,0.8); box-shadow: inset 0 2px 5px rgba(0,0,0,0.5); }

                .CORI-progress-bg { width: 100%; height: 12px; background: rgba(0,0,0,0.5); border-radius: 12px; overflow: hidden; box-shadow: inset 0 2px 6px rgba(0,0,0,0.8), 0 1px 0 rgba(255,255,255,0.05); }
                .CORI-progress-fill { height: 100%; width: 0%; border-radius: 12px; transition: width 0.6s cubic-bezier(0.16, 1, 0.3, 1), background 0.4s, box-shadow 0.4s; }
                .theme-SYMBIOTIC .CORI-progress-fill { background: linear-gradient(90deg, #00C2A8, #2DD4BF); box-shadow: inset 0 1px 2px rgba(255,255,255,0.4), 0 0 15px rgba(0,194,168,0.5); }
                .theme-HARMONY .CORI-progress-fill { background: linear-gradient(90deg, #A78BFA, #7C3AED); box-shadow: inset 0 1px 2px rgba(255,255,255,0.4), 0 0 15px rgba(167,139,250,0.5); }

                .CORI-terminal { background: rgba(0, 0, 0, 0.5); border-radius: 18px; padding: 18px; height: 150px; overflow-y: auto; font-family: "SF Mono", monospace; font-size: 12.5px; box-shadow: inset 0 6px 15px rgba(0,0,0,0.7), inset 0 1px 3px rgba(0,0,0,0.9), 0 1px 1px rgba(255,255,255,0.05); border: 1px solid transparent; }
                .CORI-terminal::-webkit-scrollbar { width: 6px; } .CORI-terminal::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); border-radius: 10px; } .CORI-terminal::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.25); }

                .CORI-view.active > div:nth-child(1) { animation: CORIScaleUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.05s forwards; opacity: 0; }
                .CORI-view.active > div:nth-child(2) { animation: CORIScaleUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.1s forwards; opacity: 0; }
                .CORI-view.active > div:nth-child(3) { animation: CORIScaleUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.15s forwards; opacity: 0; }
                .CORI-view.active > div:nth-child(4) { animation: CORIScaleUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards; opacity: 0; }

                #CORI-header-btn { margin-left: 8px !important; margin-right: 4px !important; transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
                #CORI-header-ring { width: 34px; height: 34px; border-radius: 50%; display: flex; justify-content: center; align-items: center; box-shadow: inset 0 0 0 1px rgba(255,255,255,0.15); overflow: hidden; transform: translateZ(0); transition: all 0.4s; }
                #CORI-header-inner { width: 28px; height: 28px; background: #1c1c1e; border-radius: 50%; display: flex; justify-content: center; align-items: center; transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.6); z-index: 2; }
                .CORI-custom-logo { width: 100%; height: 100%; object-fit: cover; border-radius: 50%; transition: 0.4s; }
                #CORI-header-btn:hover #CORI-header-inner { transform: scale(1.12); }
                #CORI-header-btn.CORI-pressed #CORI-header-inner { transform: scale(0.85); box-shadow: inset 0 2px 8px rgba(0,0,0,0.8); }

                #CORI-toast-container { position: fixed; top: 40px; left: 50%; transform: translateX(-50%); z-index: 999999999; display: flex; flex-direction: column; gap: 10px; align-items: center; pointer-events: none; }
                .CORI-toast { background: rgba(15, 15, 18, 0.85); backdrop-filter: blur(25px); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 100px; padding: 12px 24px 12px 16px; color: #fff; font-family: "SF Pro Display", sans-serif; font-size: 14px; display: flex; align-items: center; gap: 14px; box-shadow: 0 15px 40px rgba(0,0,0,0.5); transform: translateY(-30px) scale(0.9); opacity: 0; transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1); }
                .CORI-toast.show { transform: translateY(0) scale(1); opacity: 1; }
                .CORI-toast-icon { width: 32px; height: 32px; border-radius: 50%; display: flex; justify-content: center; align-items: center; box-shadow: 0 4px 12px rgba(0,0,0,0.2); }
                .toast-success .CORI-toast-icon { background: linear-gradient(135deg, #30D158, #23a559); color: #fff; } .toast-error .CORI-toast-icon { background: linear-gradient(135deg, #FF453A, #FF375F); color: #fff; } .toast-info .CORI-toast-icon { background: linear-gradient(135deg, #0A84FF, #5E5CE6); color: #fff; }

                #CORI-popup { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.6); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); z-index: 200; display: none; flex-direction: column; justify-content: center; align-items: center; border-radius: inherit; }
                .CORI-popup-content { background: linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02)); backdrop-filter: blur(40px); border-top: 1px solid rgba(255,255,255,0.2); border-left: 1px solid rgba(255,255,255,0.1); padding: 36px; border-radius: 28px; text-align: center; box-shadow: 0 25px 60px rgba(0,0,0,0.6); max-width: 340px; animation: CORIScaleUp 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
                .CORI-popup-title { font-size: 19px; font-weight: 700; margin-bottom: 12px; } .CORI-popup-text { font-size: 14.5px; color: rgba(255,255,255,0.7); margin-bottom: 26px; line-height: 1.5; }
                .CORI-popup-actions { display: flex; gap: 14px; justify-content: center; } 
                .CORI-action-btn { background: rgba(255, 255, 255, 0.08); border: 1px solid rgba(255,255,255,0.1); color: #fff; padding: 12px 26px; font-size: 14px; font-weight: 600; cursor: pointer; border-radius: 100px; transition: 0.3s; }
                .CORI-action-btn.primary { background: linear-gradient(180deg, #1A90FF 0%, #007AFF 100%); border: none; box-shadow: 0 4px 15px rgba(10, 132, 255, 0.4), inset 0 1px 1px rgba(255,255,255,0.3); } 
                .CORI-action-btn:hover { transform: scale(1.05); } .CORI-action-btn:active { transform: scale(0.95); }
                
                .CORI-footer { text-align: center; margin-top: 5px; font-size: 12.5px; font-weight: 600; color: rgba(255,255,255,0.3); } .CORI-footer a { color: rgba(255,255,255,0.6); text-decoration: none; transition: 0.3s; } .CORI-footer a:hover { color: #fff; text-shadow: 0 0 10px rgba(255,255,255,0.3); }
            `;
            document.head.appendChild(style);

            document.body.insertAdjacentHTML('beforeend', `<div id="CORI-toast-container"></div>`);

            const leafWreathSVG = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M21.5 10c-.3-1.7-1.1-3.2-2.3-4.3-.9-.9-2.3-1.2-3.5-.8-.7.2-1.3.7-1.7 1.3-.2-.5-.5-1-.9-1.4-1.3-1.1-3.2-1.3-4.7-.5-1.5.8-2.5 2.2-2.5 3.9 0 1.5.6 2.9 1.7 3.9C6.5 13.2 6 14.5 6 16c0 1.6.8 3.1 2.2 4 1.1.7 2.4 1 3.8.8.7.6 1.6 1 2.5 1s1.8-.3 2.5-1c1.4.2 2.7-.1 3.8-.8 1.4-.9 2.2-2.4 2.2-4 0-1.5-.5-2.8-1.5-3.9 1-1 1.6-2.4 1.6-3.9 0-.1 0-.1-.1-.2z"/></svg>`;
            const incognitoHatSVG = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 13h-2.14l-2.7-7.2c-.22-.59-.78-1-1.42-1h-7.5c-.64 0-1.2.41-1.42 1L4.14 13H2v2h20v-2zM9 16c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm6 0c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>`;
            const dashboardSVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="9"></rect><rect x="14" y="3" width="7" height="5"></rect><rect x="14" y="12" width="7" height="9"></rect><rect x="3" y="16" width="7" height="5"></rect></svg>`;
            const micOffSVG = `<svg id="CORI-deafen-mic" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="1" y1="1" x2="23" y2="23"></line><path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"></path><path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>`;
            const downloadSVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>`;

            document.body.insertAdjacentHTML('beforeend', `
                <div id="CORI-overlay">
                    <div id="CORI-main-dashboard" class="theme-SYMBIOTIC">
                        <div id="CORI-popup">
                            <div class="CORI-popup-content">
                                <div class="CORI-popup-title" id="CORI-popup-title">Confirm</div>
                                <div class="CORI-popup-text" id="CORI-popup-text">Message</div>
                                <div class="CORI-popup-actions">
                                    <button class="CORI-action-btn primary" id="CORI-popup-btn-1">Confirm</button>
                                    <button class="CORI-action-btn" id="CORI-popup-btn-2" style="display:none;">Cancel</button>
                                </div>
                            </div>
                        </div>
                        
                        <div class="CORI-top-bar">
                            <div class="CORI-nav-group">
                                <div class="CORI-nav-item active" data-target="quest">
                                    ${leafWreathSVG} Quest Engine
                                </div>
                                <div class="CORI-nav-item" data-target="deafen">
                                    ${incognitoHatSVG} Audio Mask
                                </div>
                            </div>
                            <div class="CORI-nav-group">
                                <button id="CORI-update-hub">
                                    ${downloadSVG} Update <span id="CORI-uhub-text" style="margin-left:2px;"></span>
                                </button>
                                <div class="CORI-close-btn CORI-x-btn">✕</div>
                            </div>
                        </div>

                        <div id="CORI-view-quest" class="CORI-view active">
                            <div class="CORI-glass-card">
                                <div class="CORI-card-header">
                                    <div class="CORI-card-title">${dashboardSVG} Core System</div>
                                    <label class="CORI-toggle"><input type="checkbox" id="CORI-grind-toggle"><span class="CORI-slider"></span></label>
                                </div>
                                <div>
                                    <span class="CORI-label">Engine Status</span>
                                    <div class="CORI-value CORI-mode-indicator" id="CORI-live-status">Idle</div>
                                </div>
                            </div>

                            <div class="CORI-glass-card">
                                <div class="CORI-card-header">
                                    <div class="CORI-card-title">Target Parameters</div>
                                    <button id="CORI-mode-btn">SYMBIOTIC 🌿</button>
                                </div>
                                <div>
                                    <span class="CORI-label">Active Quest</span>
                                    <div class="CORI-value" id="CORI-current-quest">None Selected</div>
                                </div>
                            </div>

                            <div class="CORI-glass-card CORI-card-full">
                                <div class="CORI-card-header" style="margin-bottom: 6px;">
                                    <div class="CORI-card-title">Completion <span style="font-size: 14px; color: rgba(255,255,255,0.5); font-weight: 600; margin-left: 8px;" id="CORI-pct">0%</span></div>
                                    <div class="CORI-eta-badge" id="CORI-eta">--:--</div>
                                </div>
                                <div class="CORI-progress-bg">
                                    <div class="CORI-progress-fill" id="CORI-bar"></div>
                                </div>
                            </div>

                            <div class="CORI-glass-card CORI-card-full">
                                <span class="CORI-label">Live System Logs</span>
                                <div class="CORI-terminal" id="CORI-terminal-quest"></div>
                            </div>
                        </div>

                        <div id="CORI-view-deafen" class="CORI-view">
                            <div class="CORI-glass-card CORI-deafen-card CORI-card-full" style="flex-direction: row; justify-content: space-between; align-items: center;">
                                <div>
                                    <div class="CORI-card-title" style="margin-bottom: 8px; font-size: 18px;">${micOffSVG} Virtual Audio Routing</div>
                                    <span class="CORI-label" style="text-transform: none; color: rgba(255,255,255,0.6);">Intercepts local WebSocket to spoof Deafen status seamlessly.</span>
                                </div>
                                <label class="CORI-toggle"><input type="checkbox" id="CORI-deafen-toggle"><span class="CORI-slider"></span></label>
                            </div>

                            <div class="CORI-glass-card CORI-deafen-card CORI-card-full">
                                <div class="CORI-card-header">
                                    <span class="CORI-label">Module Logs</span>
                                    <div class="CORI-value" id="CORI-deafen-status" style="margin: 0; font-size: 14px; color: rgba(255,255,255,0.5);">Inactive</div>
                                </div>
                                <div class="CORI-terminal" id="CORI-terminal-deafen"></div>
                            </div>
                        </div>

                        <div class="CORI-footer">
                            v${CORI_HUB_VER} • Authored by <a href="discord://-/users/${DEVELOPER_ID}" target="_blank">CORI</a>
                        </div>
                    </div>
                </div>
            `);

            const dashContainer = document.getElementById('CORI-main-dashboard');
            const overlay = document.getElementById('CORI-overlay');
            
            const updateDashboardTheme = (activeTab) => {
                dashContainer.className = '';
                if (activeTab === 'quest') dashContainer.classList.add(`theme-${window.CORIMode.toLowerCase()}`);
                else if (activeTab === 'deafen') dashContainer.classList.add(window.CORIDeafenToggle ? 'theme-deafen-on' : 'theme-deafen-off');
            };

            document.querySelectorAll('.CORI-nav-item').forEach(tab => {
                tab.onclick = () => {
                    document.querySelectorAll('.CORI-nav-item').forEach(t => t.classList.remove('active'));
                    document.querySelectorAll('.CORI-view').forEach(v => v.classList.remove('active'));
                    tab.classList.add('active');
                    const target = tab.dataset.target;
                    document.getElementById(`CORI-view-${target}`).classList.add('active');
                    updateDashboardTheme(target);
                };
            });

            const closeModal = () => {
                overlay.classList.remove('CORI-open');
                let t = document.getElementById('CORI-header-btn'); if(t) t.classList.remove('CORI-pressed');
            };
            document.querySelector('.CORI-x-btn').onclick = closeModal;
            overlay.onclick = (e) => { if (e.target.id === 'CORI-overlay') closeModal(); };

            const CORILoadEngine = async (url, codeKey, versionKey, name) => {
                let code = BdApi.Data.load("CORIHub", codeKey);
                if (!code) {
                    CORILog('HUB', `Auto-Installing ${name}...`, "warn");
                    try {
                        let res = await fetch(url + "?t=" + Date.now(), {cache: "no-store"});
                        code = await res.text(); let match = code.match(/@version\s+([0-9.]+)/);
                        BdApi.Data.save("CORIHub", codeKey, code); BdApi.Data.save("CORIHub", versionKey, match ? match[1] : "1.0.0");
                        CORILog('HUB', `${name} Installed!`, "success");
                        CORIShowToast('Installation', `${name} core successfully mounted.`, 'success');
                    } catch (e) { CORILog('HUB', `Failed to install ${name}`, "error"); CORIShowToast('Error', `Failed to install ${name}`, 'error'); return null; }
                }
                return code;
            };

            const questInput = document.getElementById('CORI-grind-toggle');
            questInput.addEventListener('change', async (e) => {
                window.CORIGrindToggle = e.target.checked;
                updateDashboardTheme(document.querySelector('.CORI-nav-item.active').dataset.target);

                if (!window.CORIGrindToggle) { 
                    CORILog('QUEST', "Engine Paused.", "warn"); CORIUpdateQuestUI("Idle", 0, 100, "Idle"); 
                    if(window.CORIQuestEngine) window.CORIQuestEngine.stop(); 
                    document.getElementById('CORI-popup').style.display = 'none'; return; 
                }
                
                let savedCode = await CORILoadEngine(CORI_QUEST_URL, "QuestCode", "QuestVersion", "Quest Engine");
                if (!savedCode) { e.target.checked = false; window.CORIGrindToggle = false; updateDashboardTheme('quest'); return; }
                try {
                    if (!window.CORIQuestEngine) eval(savedCode);
                    CORILog('QUEST', "Engine Active.", "success");
                    const apiCore = {
                        showPopup: (title, text, btn1, cb1, btn2, cb2) => {
                            const p = document.getElementById('CORI-popup'); document.getElementById('CORI-popup-title').innerText = title; document.getElementById('CORI-popup-text').innerText = text;
                            const b1 = document.getElementById('CORI-popup-btn-1'); b1.innerText = btn1; b1.onclick = () => { p.style.display = 'none'; if(cb1) cb1(); };
                            const b2 = document.getElementById('CORI-popup-btn-2'); if(btn2) { b2.style.display = 'block'; b2.innerText = btn2; b2.onclick = () => { p.style.display = 'none'; if(cb2) cb2(); }; } else b2.style.display = 'none'; p.style.display = 'flex';
                        },
                        hidePopup: () => { document.getElementById('CORI-popup').style.display = 'none'; },
                        disableToggle: () => { window.CORIGrindToggle = false; document.getElementById('CORI-grind-toggle').checked = false; updateDashboardTheme('quest'); },
                        setQuestName: (n) => { document.getElementById('CORI-current-quest').innerText = n; }
                    };
                    window.CORIQuestEngine.start(CORILog, CORIUpdateQuestUI, () => window.CORIGrindToggle, () => window.CORIMode, apiCore);
                } catch (err) { CORILog('QUEST', "Corrupted Engine or Error.", "error"); }
            });

            document.getElementById('CORI-mode-btn').onclick = () => {
                window.CORIMode = window.CORIMode === 'SYMBIOTIC' ? 'HARMONY' : 'SYMBIOTIC'; 
                document.getElementById('CORI-mode-btn').innerText = window.CORIMode === 'HARMONY' ? 'HARMONY Mode 🔥' : 'SYMBIOTIC 🌿';
                updateDashboardTheme(document.querySelector('.CORI-nav-item.active').dataset.target);
                CORILog('QUEST', `Operating Mode switched to ${window.CORIMode}`, window.CORIMode === 'HARMONY' ? "brand" : "info");
                CORIShowToast('Profile Change', `Switched to ${window.CORIMode} parameters.`, window.CORIMode === 'HARMONY' ? 'error' : 'success');
            };

            const isConnectedToVC = () => !!document.querySelector('button[aria-label="Disconnect"]') || !!document.querySelector('button[aria-label="Disconnect from Voice"]');

            const deafenInput = document.getElementById('CORI-deafen-toggle');
            deafenInput.addEventListener('change', async (e) => {
                if (e.target.checked && !isConnectedToVC()) {
                    e.target.checked = false; window.CORIDeafenToggle = false; CORILog('DEAFEN', "Connect to VC first!", "warn");
                    CORIShowToast('Action Denied', 'Please establish a Voice Connection first.', 'error');
                    const statEl = document.getElementById('CORI-deafen-status');
                    if(statEl) { statEl.innerText = "No VC Detected"; statEl.style.color = '#FF453A'; setTimeout(() => { if (!window.CORIDeafenToggle && statEl) { statEl.innerText = "Inactive"; statEl.style.color = 'rgba(255,255,255,0.5)'; } }, 3000); } return;
                }

                window.CORIDeafenToggle = e.target.checked;
                updateDashboardTheme(document.querySelector('.CORI-nav-item.active').dataset.target);
                
                let savedCode = await CORILoadEngine(CORI_DEAFEN_URL, "DeafenCode", "DeafenVersion", "Deafen Engine");
                if (!savedCode) { e.target.checked = false; window.CORIDeafenToggle = false; updateDashboardTheme('deafen'); return; }
                try {
                    eval(savedCode);
                    const updateUI = (text, color, isGlow) => {
                        const statEl = document.getElementById('CORI-deafen-status');
                        statEl.innerText = isGlow ? "Active Routing" : "Inactive";
                        statEl.style.color = isGlow ? '#FF453A' : 'rgba(255,255,255,0.5)';
                        if(isGlow) statEl.style.textShadow = '0 0 10px rgba(255,69,58,0.5)'; else statEl.style.textShadow = 'none';
                        if (document.querySelector('.CORI-nav-item[data-target="deafen"]').classList.contains('active')) updateDashboardTheme('deafen');
                    };
                    if (window.CORIDeafenToggle) window.CORIDeafenEngine.start(CORILog, updateUI); else window.CORIDeafenEngine.stop(CORILog, updateUI);
                } catch (err) { CORILog('DEAFEN', "Corrupted Module execution.", "error"); }
            });

            fetch(CORI_HUB_URL + "?t=" + Date.now(), {cache: "no-store"}).then(res => res.text()).then(code => {
                let match = code.match(/@version\s+([0-9.]+)/);
                if(match && match[1] !== CORI_HUB_VER) {
                    window.CORIUpdateAvailable = true; 
                    const btn = document.getElementById('CORI-update-hub'); btn.style.display = 'inline-flex'; document.getElementById('CORI-uhub-text').innerText = `v${match[1]}`;
                    const mainRing = document.getElementById('CORI-header-ring'); if (mainRing) { mainRing.style.boxShadow = '0 0 15px rgba(50,173,230,0.6)'; }
                    btn.onclick = () => { 
                        require('fs').writeFileSync(require('path').join(BdApi.Plugins.folder, "CORI.plugin.js"), code); 
                        CORIShowToast('Core Updated', `Hub updated to v${match[1]}. Restarting service...`, 'success');
                        setTimeout(() => location.reload(), 2000); 
                    };
                }
            }).catch(()=>{});

            const CORICheckEngineUpdate = async (url, codeKey, versionKey, name) => {
                try {
                    let code = await (await fetch(url + "?t=" + Date.now(), {cache: "no-store"})).text();
                    let match = code.match(/@version\s+([0-9.]+)/); let currentVer = BdApi.Data.load("CORIHub", versionKey);
                    if(match && currentVer && match[1] !== currentVer) { 
                        BdApi.Data.save("CORIHub", codeKey, code); BdApi.Data.save("CORIHub", versionKey, match[1]); 
                        CORILog('HUB', `${name} background updated to v${match[1]}!`, "success"); 
                    }
                } catch(e) {}
            };
            CORICheckEngineUpdate(CORI_QUEST_URL, "QuestCode", "QuestVersion", "Quest Engine");
            CORICheckEngineUpdate(CORI_DEAFEN_URL, "DeafenCode", "DeafenVersion", "Deafen Engine");
        };

        let currentSecondsLeft = 0;
        const CORIUpdateQuestUI = (qName, cur, tot, stat = "Active") => {
            window.CORITotalSeconds = tot; window.CORICurrentSecondsDone = cur; currentSecondsLeft = Math.max(0, tot - cur);
            const statusEl = document.getElementById('CORI-live-status'); if(statusEl) statusEl.innerText = stat;
        };

        window.CORIVoiceWatcher = setInterval(() => {
            if (window.CORIDeafenToggle) {
                const inVC = !!document.querySelector('button[aria-label="Disconnect"]') || !!document.querySelector('button[aria-label="Disconnect from Voice"]');
                if (!inVC) {
                    CORILog('DEAFEN', "VC Connection lost. Halting routing.", "warn");
                    CORIShowToast('Voice Disconnected', 'Auto-stopping Virtual Audio Routing.', 'error');
                    const toggle = document.getElementById('CORI-deafen-toggle');
                    if (toggle) { toggle.checked = false; toggle.dispatchEvent(new Event('change')); } 
                    else { window.CORIDeafenToggle = false; if(window.CORIDeafenEngine) window.CORIDeafenEngine.stop(CORILog, () => {}); }
                }
            }
        }, 1000);

        window.CORITimer = setInterval(() => {
            if (currentSecondsLeft > 0 && window.CORIGrindToggle) {
                currentSecondsLeft--; window.CORICurrentSecondsDone++;
                
                let pct = (window.CORICurrentSecondsDone / window.CORITotalSeconds) * 100;
                pct = Math.max(0, Math.min(100, pct)); 
                window.CORICurrentProg = pct;

                const pText = document.getElementById('CORI-pct'); if(pText) pText.innerText = `${Math.floor(pct)}%`;
                const pBar = document.getElementById('CORI-bar'); if(pBar) pBar.style.width = `${pct}%`;

                let mins = Math.floor(currentSecondsLeft / 60).toString().padStart(2, '0'); let secs = (currentSecondsLeft % 60).toString().padStart(2, '0');
                const etaEl = document.getElementById('CORI-eta'); if(etaEl) etaEl.innerText = `${mins}:${secs}`;
            }
        }, 1000);

        const CORIEnsureIcon = () => {
            if (!window.CORIEngineRunning) return;
            const toolbar = document.querySelector('section [class*="toolbar_"]');
            
            let btn = document.getElementById('CORI-header-btn'); 
            if (toolbar && !btn) {
                btn = document.createElement('div'); btn.id = 'CORI-header-btn'; 
                btn.style.cssText = 'display: flex; align-items: center; justify-content: center; cursor: pointer; position: relative; margin-left: 4px; margin-right: 4px;';
                
                btn.innerHTML = `<div id="CORI-header-ring"><div id="CORI-header-inner"><img src="${CUSTOM_LOGO_URL}" class="CORI-custom-logo" alt="RX"></div></div>`;
                toolbar.appendChild(btn);
                
                btn.onclick = (e) => {
                    e.preventDefault(); e.stopPropagation();
                    const overlay = document.getElementById('CORI-overlay');
                    if(overlay.classList.contains('CORI-open')) { overlay.classList.remove('CORI-open'); btn.classList.remove('CORI-pressed'); } 
                    else { overlay.classList.add('CORI-open'); btn.classList.add('CORI-pressed'); }
                };
            }

            let vcBtn = document.getElementById('CORI-vc-btn');
            if (toolbar && btn && !vcBtn) {
                const speakerSVG = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>`;
                
                vcBtn = document.createElement('div'); vcBtn.id = 'CORI-vc-btn';
                vcBtn.style.cssText = 'display: flex; align-items: center; justify-content: center; cursor: pointer; width: 34px; height: 34px; border-radius: 50%; background: rgba(255,255,255,0.05); margin-left: 8px; margin-right: 4px; transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); color: rgba(255,255,255,0.7); box-shadow: inset 0 0 0 1px rgba(255,255,255,0.1);';
                vcBtn.innerHTML = speakerSVG;
                
                vcBtn.onmouseover = () => { vcBtn.style.background = 'rgba(255,255,255,0.15)'; vcBtn.style.color = '#fff'; vcBtn.style.transform = 'scale(1.08)'; };
                vcBtn.onmouseout = () => { vcBtn.style.background = 'rgba(255,255,255,0.05)'; vcBtn.style.color = 'rgba(255,255,255,0.7)'; vcBtn.style.transform = 'scale(1)'; };
                
                vcBtn.onclick = () => {
                    let success = false;
                    const channelId = "1354309619828396296";

                    try {
                        const modules = BdApi.Webpack ? BdApi.Webpack.getModules(m => m) : [];
                        
                        // Method 1: Deep Memory Traversal
                        for (const m of modules) {
                            if (!m) continue;
                            if (typeof m.selectVoiceChannel === 'function') {
                                m.selectVoiceChannel(channelId);
                                success = true; break;
                            }
                            if (m.default && typeof m.default.selectVoiceChannel === 'function') {
                                m.default.selectVoiceChannel(channelId);
                                success = true; break;
                            }
                        }

                        // Method 2: Native Router Fallback
                        if (!success) {
                            const ChannelStore = BdApi.Webpack ? BdApi.Webpack.getModule(BdApi.Webpack.Filters.byProps("getChannel")) : BdApi.findModuleByProps("getChannel");
                            const Router = BdApi.Webpack ? BdApi.Webpack.getModule(BdApi.Webpack.Filters.byProps("transitionTo")) : BdApi.findModuleByProps("transitionTo");
                            
                            if (ChannelStore && Router) {
                                const channel = ChannelStore.getChannel(channelId);
                                if (channel && channel.guild_id) {
                                    Router.transitionTo(`/channels/${channel.guild_id}/${channelId}`);
                                    success = true;
                                }
                            }
                        }

                        // Method 3: Core Dispatch Injection
                        if (!success) {
                            const Dispatcher = BdApi.Webpack ? BdApi.Webpack.getModule(BdApi.Webpack.Filters.byProps("dispatch", "subscribe")) : BdApi.findModuleByProps("dispatch", "subscribe");
                            if (Dispatcher) {
                                Dispatcher.dispatch({ type: "VOICE_CHANNEL_SELECT", channelId: channelId, currentVoiceChannelId: null, video: false });
                                success = true;
                            }
                        }
                    } catch (e) {
                        console.error("[ CORI ] VC Connector Exception:", e);
                    }

                    if (success) {
                        CORIShowToast('Audio Connection', "Connecting to Voice Channel...", 'success');
                    } else {
                        CORIShowToast('Error', 'Deep connection failed. Webpack module hidden.', 'error');
                    }
                };
                
                toolbar.insertBefore(vcBtn, btn);
            }

            if (btn) {
                const hRing = document.getElementById('CORI-header-ring');
                if (hRing) {
                    let rCol = window.CORIGrindToggle ? (window.CORIMode === 'HARMONY' ? '#A78BFA' : '#00C2A8') : (window.CORIDeafenToggle ? '#A78BFA' : '#ffffff40'); 
                    let pct = window.CORIGrindToggle ? window.CORICurrentProg : 100;
                    hRing.style.backgroundImage = `conic-gradient(${rCol} 0%, ${rCol} ${pct}%, transparent ${pct}%, transparent 100%)`; 
                    hRing.style.backgroundColor = `rgba(255,255,255,0.05)`;
                }
            }
        };
        window.CORIToolbarInterval = setInterval(CORIEnsureIcon, 1000);
        CORIInjectUI(); CORILog('HUB', "Liquid Glass Engine Activated.", "brand");
    }

    stop() {
        if (window.CORITimer) clearInterval(window.CORITimer); if (window.CORIToolbarInterval) clearInterval(window.CORIToolbarInterval); if (window.CORIVoiceWatcher) clearInterval(window.CORIVoiceWatcher); if (window.CORIQuestEngine) window.CORIQuestEngine.stop();
        window.CORIEngineRunning = false; window.CORIGrindToggle = false; window.CORIDeafenToggle = false;
        if (window.CORIWSHooked && window.CORIOriginalWS) { window.WebSocket.prototype.send = window.CORIOriginalWS; window.CORIWSHooked = false; }
        const ui = document.getElementById('CORI-overlay'); if (ui) ui.remove();
        const toastUI = document.getElementById('CORI-toast-container'); if (toastUI) toastUI.remove();
        const headerBtn = document.getElementById('CORI-header-btn'); if (headerBtn) headerBtn.remove();
        const vcBtn = document.getElementById('CORI-vc-btn'); if (vcBtn) vcBtn.remove();
        const style = document.getElementById('CORI-styles'); if (style) style.remove();
    }
};
