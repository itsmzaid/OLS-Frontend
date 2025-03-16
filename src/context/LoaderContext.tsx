import React, {createContext, useState, useContext, ReactNode} from 'react';
import {View, ActivityIndicator, StyleSheet, Modal} from 'react-native';

type LoaderContextType = {
  showLoader: () => void;
  hideLoader: () => void;
};

const LoaderContext = createContext<LoaderContextType | undefined>(undefined);

export const LoaderProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [loading, setLoading] = useState(false);

  const showLoader = () => setLoading(true);
  const hideLoader = () => setLoading(false);

  return (
    <LoaderContext.Provider value={{showLoader, hideLoader}}>
      {children}
      {loading && (
        <Modal transparent={true} animationType="fade">
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#1398D0" />
          </View>
        </Modal>
      )}
    </LoaderContext.Provider>
  );
};

export const useLoader = () => {
  const context = useContext(LoaderContext);
  if (!context) {
    throw new Error('useLoader must be used within a LoaderProvider');
  }
  return context;
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
});
