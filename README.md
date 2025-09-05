# README

## Setup
### On your Laptop
Please ensure the following are installed on your laptop:

* Node
* Expo
* Code Editor (e.g., VS Code)

More Info here: [https://reactnative.dev/docs/environment-setup](https://reactnative.dev/docs/environment-setup)

### On your Mobile Device
* Go to the Play Store and install Expo on your device


## Configure and run this code
1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app:

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Publishing 
Pushes to Expo server. If you use the `--chanel default` flag, the QR code will always point to the latest release.
```
eas update --channel default
```

## Other Nodes
* To upgrade the Expo bundler: `npx expo install expo@latest`