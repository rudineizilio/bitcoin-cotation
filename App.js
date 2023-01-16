import React, { useState, useEffect } from "react";
import { StyleSheet, StatusBar, SafeAreaView, Platform } from "react-native";
import CurrentPrice from "./src/components/CurrentPrice";
import HistoryGraphic from "./src/components/HistoryGraphic";
import QuotationsList from "./src/components/QuotationsList";

function addZero(number) {
  if (number <= 9) {
    return "0" + number;
  }
  return number;
}

function getUrl(qtdDias) {
  const date = new Date();
  const listLastDays = qtdDias;

  const end_date = `${date.getFullYear() -1}-${addZero(date.getMonth() + 1)}-${addZero(date.getDate())}`;
  date.setDate(date.getDate() - listLastDays);

  const start_date = `${date.getFullYear() -1}-${addZero(date.getMonth() + 1)}-${addZero(date.getDate())}`;

  //URL  GET API
  return `https://api.coindesk.com/v1/bpi/historical/close.json?start=${start_date}&end=${end_date}`;
}

async function getListCoins(url) {
  let response = await fetch(url);
  let retunrApi = await response.json();
  let selectListQuotations = retunrApi.bpi;
  const queryCoinsList = Object.keys(selectListQuotations).map((key) => {
    return {
      date: key.split("-").reverse().join("/"),
      value: selectListQuotations[key],
    };
  });
  let data = queryCoinsList.reverse();
  return data;
}

async function getPriceCoinsGraphic(url) {
  let responseG = await fetch(url);
  let returnApiG = await responseG.json();
  let selectListQuotationsG = returnApiG.bpi;
  const queryCoinsListG = Object.keys(selectListQuotationsG).map((key) => {
    return selectListQuotationsG[key];
  });
  let dataG = queryCoinsListG;
  return dataG;
}

export default function App() {
  const [coinsList, setCoinsList] = useState([]);
  const [coinsGraphicList, setCoinsGraphicList] = useState([0]);
  const [days, setDays] = useState(30);
  const [updateData, setUpdateData] = useState(true);


  function updateDay(number) {
    setDays(number);
    setUpdateData(true);
  }

  useEffect(() => {
    getListCoins(getUrl(days)).then((data) => {
      setCoinsList(data);
    });
    getPriceCoinsGraphic(getUrl(days)).then((dataG) => {
      setCoinsGraphicList(dataG);
    });
    if (updateData) {
      setUpdateData(false);
    }
  }, [updateData]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle='light-content'
      />
      <CurrentPrice></CurrentPrice>
      <HistoryGraphic infoDataGraphic={coinsGraphicList}></HistoryGraphic>
      <QuotationsList filterDay={updateDay} listTransactions={coinsList}></QuotationsList>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    paddingTop: Platform.OS == 'android' ? 40 : 0,
  },
});
