import { StyleSheet } from "react-native";
import { COLORS, FONT_SIZES } from "../constants/theme";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:COLORS.background,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 16,
      backgroundColor: 'white',
      borderBottomWidth: 1,
      borderBottomColor: '#E0E0E0',
    },
    headerTitle: {
      fontSize:FONT_SIZES.extraLarge,
      fontWeight: 'bold',
      color:COLORS.text,
    },
    clearButton: {
      padding: 8,
    },
    clearButtonText: {
      color:COLORS.danger,
      fontSize:FONT_SIZES.medium,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    listContent: {
      flexGrow: 1,
      paddingBottom: 16,
    },
    itemContainer: {
      backgroundColor: 'white',
      marginHorizontal: 16,
      marginVertical: 8,
      borderRadius: 8,
      padding: 12,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
    },
    selectedItem: {
      borderColor:COLORS.border,
      borderWidth: 1,
    },
    itemContent: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    icon: {
      marginRight: 12,
    },
    textContainer: {
      flex: 1,
    },
    itemName: {
      fontSize:FONT_SIZES.medium,
      fontWeight: '500',
      color:COLORS.text,
      marginBottom: 4,
    },
    itemAddress: {
      fontSize:FONT_SIZES.small,
      color:COLORS.textLight2,
      marginBottom: 4,
    },
    itemDate: {
      fontSize:FONT_SIZES.extraSmall,
      color:COLORS.textLight,
    },
    deleteButton: {
      padding: 8,
      marginLeft: 8,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 40,
    },
    emptyText: {
      fontSize:FONT_SIZES.large,
      color:COLORS.textLight,
      marginTop: 16,
      textAlign: 'center',
    },
    emptySubText: {
      fontSize:FONT_SIZES.small,
      color:COLORS.textLight,
      marginTop: 8,
      textAlign: 'center',
    },
  });
  export default styles;