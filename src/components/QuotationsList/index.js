import React, { Fragment } from "react";
import { ScrollView, View, Text, TouchableOpacity, FlatList } from "react-native";
import QuotationsItem from "./QuotationsItem";
import styles from "./styles";

export default function QuotationsList(props) {
  const daysQuery = props.filterDay;

  return(
    <Fragment>
      <View style={styles.filters}>
        <TouchableOpacity
          style={styles.buttonQuery}
          onPress={() => daysQuery(7)}
        >
          <Text style={styles.textButtonQuery}>7D</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonQuery}
          onPress={() => daysQuery(15)}
        >
          <Text style={styles.textButtonQuery}>15D</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonQuery}
          onPress={() => daysQuery(30)}
        >
          <Text style={styles.textButtonQuery}>1M</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonQuery}
          onPress={() => daysQuery(90)}
        >
          <Text style={styles.textButtonQuery}>3M</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonQuery}
          onPress={() => daysQuery(180)}
        >
          <Text style={styles.textButtonQuery}>6M</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonQuery}
          onPress={() => daysQuery(365)}
        >
          <Text style={styles.textButtonQuery}>1A</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <FlatList data={props.listTransactions} renderItem={({item}) => {return <QuotationsItem value={item.value} date={item.date}/>}}/>
      </ScrollView>
    </Fragment>
  )
}