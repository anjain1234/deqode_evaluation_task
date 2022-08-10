import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-simple-toast";

async function get(Key, defaultValue = null) {
    try {
        let value = await AsyncStorage.getItem(Key);

        if (value !== null) {
            value = JSON.parse(value);
        }

        return value;
    } catch (error) {
        Toast.show("Could not save data!")
    }
}

async function set(Key, value) {
    try {
        return await AsyncStorage.setItem(Key, JSON.stringify(value));
    } catch (error) {
        Toast.show("Could not save data!")
    }
}

async function remove(Key) { }

async function clear() {
    try {
        return await AsyncStorage.clear(() => {
            Toast.show("Data Cleared.")
        })
    } catch (error) {
        Toast.show("Could not clear data")
    }
}

export default {
    get,
    set,
    clear,
    remove,
}