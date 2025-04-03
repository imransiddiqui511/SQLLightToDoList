# React Native Places Search with Google Maps

This is a React Native application that allows users to search for places using Google Maps Places API, view them on a map, and maintain a search history.

## Prerequisites

- Google Maps API key with the following APIs enabled:
  - Maps SDK for Android
  - Places API

## Getting Started

### 1. Set Up Your Google Maps API Key

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the required APIs:
   - Maps SDK for Android
   - Places API
4. Create credentials (API key)
5. Restrict your API key for security

### 2. Configure the App

#### For Android:
1. Open `android/app/src/main/AndroidManifest.xml`
2. Add your API key inside the `<application>` tag:
  ```xml
   <meta-data
     android:name="com.google.android.geo.API_KEY"
     android:value="YOUR_ANDROID_API_KEY"/>
   ```
1. Open `src/screens/SearchScreen.js`
2. Assign your API key to the GOOGLE_API_KEY varaible
```js
const GOOGLE_API_KEY = 'API_KEY';
```

#### OUTPUT:

<img src="https://github.com/user-attachments/assets/88157684-1d63-4e27-8e26-d527b1b6672e" width="300"/> <img src="https://github.com/user-attachments/assets/7718d7f8-c011-49ba-be8f-b9d60a5594f1" width="300"/> <img src="https://github.com/user-attachments/assets/a5b85ae6-7858-4828-96e1-951f0858fbc2" width="300"/>  <img src="https://github.com/user-attachments/assets/c3e1d0e3-2770-4c48-b271-1d7817eefd9d" width="300"/> <img src="https://github.com/user-attachments/assets/1da4b15c-a7a0-4d54-9c42-2e5b793e9863" width="300"/>```


