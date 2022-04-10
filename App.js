import react, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity, KeyboardAvoidingView, Platform, TextInput, ScrollView, Keyboard } from 'react-native';
import Task from './components/Task';

import colors from './config/colors';
import { color } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';

export default function App() {
  console.log("App Exec")

  const [task, setTask] = useState();
  const [taskItems, setTaskItems]  = useState([]);
  
  const handleAddTask = () => {
    // console.log(task);
    Keyboard.dismiss();
    setTaskItems([...taskItems, task]);
    setTask(null);
  }


  const completeTask = (index) => {
      let itemsCopy = [...taskItems];
      itemsCopy.splice(index, 1);
      setTaskItems(itemsCopy);

  }

  return (
    <View style={styles.container}>

      {/* Added this scroll view to enable scrolling when list gets longer than the page */}
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        keyboardShouldPersistTaps='handled'
      >

        {/* Today's Tasks */}
        <View style={styles.textWrapper}>
          <Text style={styles.sectionTitle}>Today's Tasks</Text>

          <View
            style={{
              borderBottomColor: 'grey',
              borderBottomWidth: 1,
              marginTop: 5
            }}
          />

          <View style={styles.items}> 
              {/* All the tasks will come here */}
              {
                taskItems.map((item, index) => {
                return(
                  <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                      <Task text={item}/>
                  </TouchableOpacity>
                ) 
                
                })
              }
          </View>

        </View>

      </ScrollView>

      

      <KeyboardAvoidingView 
          behavior={Platform.OS === "ios" ? "padding" : "height" }
          style = {styles.writeTaskWrapper} 
        >
          <TextInput style ={styles.input} placeholder={'Write a Task'} value={task} onChangeText={(text) => setTask(text)} />

          <TouchableOpacity onPress={() => handleAddTask()}>
            <View style={styles.addWrapper} >
              <Text style={styles.addText}>+</Text>
            </View>
          </TouchableOpacity>

      </KeyboardAvoidingView>

      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.back,
  },
  textWrapper: {
    paddingTop: 70,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    
  },
  items: {
    marginTop: 30
  },

  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    // justifyContent: 'space-around',
    justifyContent: 'center',
    alignItems: 'center',
    
    
  },
  input: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,

    marginRight: 7
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,

    marginLeft: 7
  },
  addText: {},
});
