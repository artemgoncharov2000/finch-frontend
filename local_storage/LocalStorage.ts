import * as SecureStore from 'expo-secure-store';

async function save(key: string, value: any){
    await SecureStore.setItemAsync(key, value);
}

async function getValueFor(key: string){
  let result = await SecureStore.getItemAsync(key);
  if(result){
    return result
  } else {
    return null
  }
}

async function deleteItem(key: string) {
    await SecureStore.deleteItemAsync(key)
}

const LocalStorage = {  
  save: save,
  getValueFor: getValueFor,
  delete: deleteItem
}

export default LocalStorage;