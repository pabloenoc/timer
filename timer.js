console.log("Timer script ready to start...");

function timer() {
    return {
        inputMinutes: 0,
        minutes: 0,
        seconds: 0,
        intervalId: null,

        start() {
            this.minutes = this.inputMinutes;
            this.seconds = 0;

            if (this.intervalId !== null) {
                clearInterval(this.intervalId);
                this.intervalId = null;
            }

            this.intervalId = setInterval(() => {
                if (this.seconds === 0) {
                    if (this.minutes === 0) {
                        clearInterval(this.intervalId);
                        this.intervalId = null;
                        this.onFinish();
                        return;
                    }
                    this.minutes--;
                    this.seconds = 59;
                } else {
                    this.seconds--;
                }
            }, 1000);
        },

        stop() {
            if (this.intervalId !== null) {
                clearInterval(this.intervalId);
                this.intervalId = null;
            }
        },

        onFinish() {
            console.log("Timer finished");
            // TODO: Notifications
        }
    }
}

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register("/sw.js")
    .then(reg => {
        console.log("Service worker registered.");
    })
    .catch(err => {
        console.error("ServiceWorker registration failed.");
    })
} else {
    console.log('There is no service worker support in this browser.');
}