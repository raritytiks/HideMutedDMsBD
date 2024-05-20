/**
 * @name HideMutedDMs
 * @version 1.0.1
 * @description Adds a button to toggle the visibility of muted direct messages from the direct message list in Discord.
 * @author raritytiks
 */

module.exports = class HideMutedDMs {
    constructor() {
        this.isHidden = true;
        this.button = null;
    }

    start() {
        this.addToggleButton();
        this.observeDMList();
    }

    stop() {
        if (this.observer) {
            this.observer.disconnect();
        }
        this.removeToggleButton();
        this.showAllDMs();
    }

    addToggleButton() {
        const dmHeader = document.querySelector('[class*="privateChannelsHeader"]');
        if (dmHeader) {
            this.button = document.createElement('div');
            this.button.innerHTML = `
                <svg width="24" height="24" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M12 4.5C7.305 4.5 3.165 7.125 1.5 11.625C3.165 16.125 7.305 18.75 12 18.75C16.695 18.75 20.835 16.125 22.5 11.625C20.835 7.125 16.695 4.5 12 4.5M12 15.75C9.93 15.75 8.25 14.07 8.25 12C8.25 9.93 9.93 8.25 12 8.25C14.07 8.25 15.75 9.93 15.75 12C15.75 14.07 14.07 15.75 12 15.75M12 10.5C11.175 10.5 10.5 11.175 10.5 12C10.5 12.825 11.175 13.5 12 13.5C12.825 13.5 13.5 12.825 13.5 12C13.5 11.175 12.825 10.5 12 10.5Z" />
                </svg>
            `;
            this.button.style.cursor = "pointer";
            this.button.style.padding = "5px";
            this.button.style.margin = "0 5px";
            this.button.style.display = "flex";
            this.button.style.alignItems = "center";
            this.button.title = "Toggle Muted DMs";

            this.button.onclick = () => {
                this.isHidden = !this.isHidden;
                this.hideMutedDMs();
            };

            dmHeader.appendChild(this.button);
        }
    }

    removeToggleButton() {
        if (this.button) {
            this.button.remove();
        }
    }

    observeDMList() {
        const dmList = document.querySelector('[class*="privateChannels"]');
        if (dmList) {
            this.observer = new MutationObserver(() => {
                this.hideMutedDMs();
            });
            this.observer.observe(dmList, { childList: true, subtree: true });
            this.hideMutedDMs();
        }
    }

    hideMutedDMs() {
        const dmListItems = document.querySelectorAll('[class*="privateChannels"] [role="listitem"]');
        dmListItems.forEach((item) => {
            const mutedIcon = item.querySelector('[class*="muted"]');
            if (mutedIcon) {
                item.style.display = this.isHidden ? 'none' : '';
            }
        });
    }

    showAllDMs() {
        const dmListItems = document.querySelectorAll('[class*="privateChannels"] [role="listitem"]');
        dmListItems.forEach((item) => {
            item.style.display = '';
        });
    }
};
