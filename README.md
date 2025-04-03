# React Native Places Search with Google Maps

This is a React Native application that allows users to search for places using Google Maps Places API, view them on a map, and maintain a search history.

## Prerequisites

- Google Maps API key with the following APIs enabled:
  - Maps SDK for Android
  - Maps SDK for iOS
  - Places API

## Getting Started

### 1. Set Up Your Google Maps API Key

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the required APIs:
   - Maps SDK for Android
   - Maps SDK for iOS
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