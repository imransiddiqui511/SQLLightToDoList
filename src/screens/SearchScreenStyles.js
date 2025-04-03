import { StyleSheet } from "react-native";
import { COLORS, FONT_SIZES } from "../constants/theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor:COLORS.background,
  },
  searchContainer: {
    marginBottom: 16,
  },
  textInputContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  textInput: {
    height: 48,
    fontSize: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    paddingLeft: 40,
  },
  listView: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginTop: 8,
    elevation: 3,
  },
  row: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  description: {
    fontSize:FONT_SIZES.small,
  },
  searchIconContainer: {
    position: 'absolute',
    left: 12,
    top: 12,
    zIndex: 1,
  },
  recentSearchesContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    elevation: 2,
  },
  sectionTitle: {
    fontSize:FONT_SIZES.medium,
    fontWeight: 'bold',
    marginBottom: 8,
    color:COLORS.text,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  historyIcon: {
    marginRight: 12,
  },
  recentItemText: {
    flex: 1,
  },
  recentItemName: {
    fontSize:FONT_SIZES.medium,
    fontWeight: '500',
    color:COLORS.text,
  },
  recentItemDetails: {
    fontSize:FONT_SIZES.extraSmall,
    color:COLORS.textLight2,
    marginTop: 2,
  },
  historyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:COLORS.border,
    borderRadius: 8,
    padding: 14,
    elevation: 2,
  },
  historyButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
  },
});
export default styles;