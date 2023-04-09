import { Dimensions, StyleSheet } from 'react-native';

var maxWidth = Dimensions.get('window').width; //full width

const styles = StyleSheet.create({
  container: {
    width: maxWidth,
    marginTop: 60,
    alignItems: 'center',
  },
  header: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  wrapper: {
    width: 40,
    height: 40,
    borderRadius: 50,
    borderWidth: 5,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginLeft: 0,
    fontSize: 22,
    fontWeight: 'bold',
    marginStart: '20%',
  },
});

export default styles;
