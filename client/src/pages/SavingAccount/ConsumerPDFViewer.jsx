import React from 'react';
import { PDFViewer, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const ConsumerPDFViewer = ({ data }) => {
  const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#E4E4E4'
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1
    }
  });

  return (
    <div className="pdf-viewer">
      <PDFViewer style={{ width: '100%', height: '600px' }}>
        <Document>
          <Page size="A4" style={styles.page}>
            <View style={styles.section}>
             
           <Text>Transaction No</Text>
              <Text>Account Number</Text>
              <Text>Consumer Name</Text>
              <Text>Total Balance</Text>
            </View>
            {data.map((curUser, index) => (
              <View key={index} style={styles.section}>
               
                <Text>{curUser.transaction_no}</Text>
                <Text>{curUser.account_no}</Text>
                <Text>{curUser.consumer_name}</Text>
                <Text>{curUser.total_bal}</Text>
              </View>
            ))}
          </Page>
        </Document>
      </PDFViewer>
    </div>
  );
};

export default ConsumerPDFViewer;
