import { View, Text, Image } from "react-native";
import styles from "./styles";

export default function QuotationsItem(props) {
  return(
    <View style={styles.mainContent}>
      <View style={styles.contextLeft}>
        <View style={styles.boxLogo}>
          <Image 
            style={styles.logBitcoin}
            source={require('../../../images/bitcoin_logo.png')}>            
          </Image>
          <Text style={styles.dayCotation}>{props.date}</Text>
        </View>
      </View>
      <View style={styles.contextRight}>
        <Text style={styles.price}>{props.value}</Text>
      </View>
    </View>
  )
}