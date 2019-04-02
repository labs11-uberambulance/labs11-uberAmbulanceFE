importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');

firebase.initializeApp({
    messagingSenderId: '211505911643',
})


const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler((payload) => {
    var notificationTitle = 'new notification for Birth Ride';
    return self.registration.showNotification(notificationTitle,
      notificationOptions);
})
