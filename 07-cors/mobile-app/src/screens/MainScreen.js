import { Button, Text, View } from "react-native"
import axios from "axios"
import { useState } from "react"

const MainScreen = () => {

  const [data, setData] = useState('null')

  const getServerData = async () => {
    const response = await axios.get("http://localhost:3000/ping")

    const responseData = response.data
    const message = JSON.stringify(responseData)

    setData(message)
  }

  return (
    <View>
      <Text>Hit the button to get the data from server</Text>
      <Button title="Get Data" onPress={getServerData} />
      <Text>{data}</Text>
    </View>
  )
}

export default MainScreen