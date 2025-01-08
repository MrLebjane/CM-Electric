import AsyncStorage from "@react-native-async-storage/async-storage";

// Define the key used to store data in AsyncStorage
export const STORAGE_TECH = '@MyApp:Data';
export const STORAGE_BOOKID= '@MYApp:DataTec';
export const STORAGE_CLIENTID= '@MYApp:DataID';
export const STORAGE_CLIENTBOOKID= '@MYApp:DataBookID';


export const getDataFromStorage = async (STORAGE_KEY) => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    return data !== null ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error reading data from AsyncStorage:', error);
    return null;
  }
};

export const setDataToStorage = async (STORAGE_KEY,data) => {
  try {
    const serializedData = JSON.stringify(data);
    await AsyncStorage.setItem(STORAGE_KEY, serializedData);
  } catch (error) {
    console.error('Error saving data to AsyncStorage:', error);
  }
};
