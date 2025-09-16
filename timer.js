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
            sendNotification();
        }
    }
}

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register("sw.js")
        .then(reg => {
            console.log("Service worker registered.");
        })
        .catch(err => {
            console.error("ServiceWorker registration failed.");
        })
} else {
    console.log('There is no service worker support in this browser.');
}

async function sendNotification() {
    if (!('Notification' in window)) return console.log('Notifications not supported');
    if (Notification.permission !== 'granted') return console.log('Permission for notifactions not granted yet');

    try {

        options = {
            body: 'Timer is up!',
            icon: 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(
                `<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128">
     <rect width="100%" height="100%" fill="#ffffff"/>
     <text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" font-size="64">🚧</text>
   </svg>`
            ),
            renotify: false

        }

        const serviceWorkerRegistration = await navigator.serviceWorker.ready;
        serviceWorkerRegistration.showNotification('(Elias Timer) Task Completed', options);
        console.log('Notification requested');
    } catch (err) {
        console.log('Failed to show notification:', err);
    }
}