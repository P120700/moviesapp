# MoviesApp Setup Guide  

## Prerequisites  
- Ensure you have [Node.js](https://nodejs.org/) and [Yarn](https://yarnpkg.com/) installed.  
- Install [Expo CLI](https://docs.expo.dev/get-started/installation/) if you haven’t already:  
  ```sh
  npm install -g expo-cli
  ```  
- Install [EAS CLI](https://expo.dev/eas) for building:  
  ```sh
  npm install -g eas-cli
  ```  
- Make sure you have [Docker](https://www.docker.com/) installed if you want to run the backend in a container.  

## Setup Instructions  

### Step 1: Start the Backend Server  
- Run the backend server using the provided Docker image:  
  ```sh
  docker run -p 3000:3000 webbylabhub/movies
  ```  
- Copy the backend URL (e.g., `http://localhost:3000`).  

### Step 2: Configure Environment Variables  
- Create a `.env` file in the root directory.  
- Use the provided `.env.example` as a reference.  
- Set the `EXPO_PUBLIC_API_URL` variable to the backend URL from Step 1.  
- If running the backend locally, you can use the default `EXPO_PUBLIC_API_URL` from `.env.example`.  

### Step 3: Install Dependencies  
- Run the following command to install all required dependencies:  
  ```sh
  yarn
  ```  

### Step 4: Prebuild the Project  
- Run the prebuild command to ensure native dependencies are set up correctly:  
  ```sh
  npx expo prebuild --clean
  ```  

### Step 5: Build the Application  
- To create a development build, use the following commands:  
  - **Android:**  
    ```sh
    eas build --platform android --local --profile development
    ```  
  - **iOS:**  
    ```sh
    eas build --platform ios --local --profile development
    ```  

### Step 6: Install the Build on an Emulator/Simulator  
- Move the generated APK (Android) or iOS app to your emulator/simulator.  
- You should now see the **MoviesApp** installed on your device.  

### Step 7: Run the Application  
- Start the development server:  
  ```sh
  yarn start --clear
  ```  
- Run the app on your preferred platform:  
  - **iOS:** Press `i`  
  - **Android:** Press `a`  
