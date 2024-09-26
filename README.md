# myQuote App

This is a simple React Native app that displays a random quote fetched from the FavQs API. The user can like quotes, view liked quotes, copy the quote to the clipboard, and search for the author's name on Google. The app supports navigation and local storage using AsyncStorage for saving liked quotes.

## Features

- Fetches random quotes and displays them.
- Allows the user to like and save quotes locally.
- View all liked quotes in a separate screen.
- Copy quotes to the clipboard.
- Search the quote's author on Google by tapping the author's name.
- Option to delete liked quotes.
- Toast message functionality for Android and iOS.

## Technologies Used

- React Native
- Expo
- AsyncStorage for persistent local storage
- FavQs API for fetching quotes
- `react-navigation` for navigating between screens
- `Linking` API for opening web browser
- `Clipboard` API for copying to clipboard
- `ToastAndroid` for Android toast messages and `Alert` for iOS

## Screenshots

## Installation

To run this app locally, follow the steps below:

1. Clone this repository:

```bash
git clone https://github.com/yourusername/quote-app.git
```

2. Install the dependencies:

```bash
cd quote-app
npm install
```

3. Start the Expo development server:

```bash
expo start
```
