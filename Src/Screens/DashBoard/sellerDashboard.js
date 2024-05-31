import React, {useRef, useEffect, useState} from 'react';
import {
  Image,
  Modal,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  StyleSheet,
  ScrollView,
  TextInput,
  ToastAndroid,
  Alert,
} from 'react-native';
import color from '../../Assets/colors/colors';
import {useNavigation} from '@react-navigation/native';
import {Icons} from '../../Components/Icons';
import DocumentPicker from 'react-native-document-picker';
import HeaderWithSearchFilter from '../../Components/HeaderWithSearchFilter';
import ProductsCard from '../../Components/ProductsCard';
import BtnComp from '../../Components/BtnComp';
import {useSelector} from 'react-redux';
import {BASE_URL, Img_URL_USER} from '../Signin/Signin';

const {height, width} = Dimensions.get('window');

const SellerDashBoard = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const {token} = useSelector(state => state.TokenReducer);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);

  const getOverall = async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${token}`);

      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
      };
      const apiurl = `${BASE_URL}products`;

      const response = await fetch(apiurl, requestOptions);
      const result = await response.json();
      if (result) {
        setProducts(result.products);
      } else if (result.error) {
        Alert.alert(result.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getOverall();
  }, []);

  const deleteProduct = async id => {
    try {
      const myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${token}`);

      const requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        redirect: 'follow',
      };
      const apiurl = `${BASE_URL}products/${id}`;

      const response = await fetch(apiurl, requestOptions);
      const result = await response.json();
      if (response.ok) {
        ToastAndroid.show('Product deleted successfully', ToastAndroid.SHORT);
        getOverall();
        toggleModal();
      } else {
        ToastAndroid.show('Failed to delete product', ToastAndroid.SHORT);
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const filteredData = products.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const toggleEditModal = () => {
    setEditModalVisible(!editModalVisible);
  };

  const handleShowProduct = product => {
    setSelectedProduct(product);
    toggleModal();
  };

  const handleEditProduct = () => {
    toggleModal();
    toggleEditModal();
  };

  const handleUpdateProduct = async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${token}`);
      myHeaders.append('Content-Type', 'application/json');

      const requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: JSON.stringify({
          name: selectedProduct.name,
          description: selectedProduct.description,
          price: selectedProduct.price,
          stock: selectedProduct.stock,
          image_path: {
            uri: selectedProduct.image_path.uri,
            type: selectedProduct.image_path.type,
            name: selectedProduct.image_path.name,
          },
        }),
        redirect: 'follow',
      };

      const apiurl = `${BASE_URL}products/${selectedProduct.id}`;

      const response = await fetch(apiurl, requestOptions);
      const result = await response.json();

      if (response.ok) {
        ToastAndroid.show('Product updated successfully', ToastAndroid.SHORT);
        getOverall();
        toggleEditModal();
      } else {
        ToastAndroid.show('Failed to update product', ToastAndroid.SHORT);
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleFilePick = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      if (result) {
        setSelectedProduct({...selectedProduct, image_path: result[0]});
      }
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        // User canceled the document picker
      } else {
        console.error('Error occurred while picking document:', error);
        throw error;
      }
    }
  };

  return (
    <View style={{flex: 1}}>
      <TouchableOpacity
        style={{
          position: 'absolute',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: color.default,
          zIndex: 999,
          bottom: 80,
          right: 20,
          width: 50,
          height: 50,
          borderRadius: 100,
        }}
        onPress={() => navigation.navigate('addProducts')}>
        <Text style={{fontSize: 20, color: 'white'}}>+</Text>
      </TouchableOpacity>
      <HeaderWithSearchFilter
        onPress={() => {
          navigation.openDrawer();
        }}
        onPressNotification={() => {
          navigation.navigate('notification_screen');
        }}
        onPressProfile={() => {
          navigation.navigate('editUserProfile');
        }}
        titleText="What are you looking for?"
        bellIcon="bell"
        onChangeText={val => {
          setSearchTerm(val);
        }}
        value={searchTerm}
        screen="user"
      />
      <ScrollView
        style={{
          paddingHorizontal: 15,
          paddingVertical: 20,
          marginTop: 15,
          marginBottom: 50,
        }}>
        <View
          style={{
            flexDirection: 'column',
            width: '100%',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            flex: 1,
            marginBottom: 30,
          }}>
          {filteredData.map((itemdata, ind) => (
            <ProductsCard
              onPress={() => handleShowProduct(itemdata)}
              key={ind}
              serviceTitle={itemdata.name}
              iconUrl={
                itemdata.image_path === null
                  ? {uri: 'https://dummyimage.com/hd1080'}
                  : {uri: `${Img_URL_USER}${itemdata.image_path}`}
              }
            />
          ))}
        </View>
        <View style={{marginTop: '17%'}} />
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Product Details</Text>
              <TouchableOpacity onPress={toggleModal}>
                <Icons.FontAwesome5
                  name="times"
                  color={color.white}
                  size={20}
                />
              </TouchableOpacity>
            </View>

            {selectedProduct && (
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.productImageContainer}>
                  {selectedProduct.image_path === null ? (
                    <Image
                      style={styles.productImage}
                      resizeMode="contain"
                      source={{uri: 'https://dummyimage.com/hd1080'}}
                    />
                  ) : (
                    <Image
                      style={styles.productImage}
                      resizeMode="contain"
                      source={{
                        uri: `${Img_URL_USER}${selectedProduct.image_path}`,
                      }}
                    />
                  )}
                </View>

                <View style={styles.productDetails}>
                  <Text style={styles.productName}>{selectedProduct.name}</Text>
                  <Text style={styles.productDescription}>
                    {selectedProduct.description}
                  </Text>
                  <View style={styles.productStats}>
                    <View style={styles.statItem}>
                      <Text style={styles.statLabel}>Price</Text>
                      <Text style={styles.statValue}>
                        ${selectedProduct.price}
                      </Text>
                    </View>
                    <View style={styles.statItem}>
                      <Text style={styles.statLabel}>Stock</Text>
                      <Text style={styles.statValue}>
                        {selectedProduct.stock}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.btnContainer}>
                  <BtnComp
                    btnText="Edit"
                    BtnStyle={styles.BtnStyle}
                    onPressFunc={handleEditProduct}
                  />
                  <BtnComp
                    btnText="Delete"
                    BtnStyle={styles.BtnStyle}
                    onPressFunc={() => deleteProduct(selectedProduct.id)}
                  />
                </View>
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={editModalVisible}
        onRequestClose={() => setEditModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Edit Product</Text>
              <TouchableOpacity onPress={toggleEditModal}>
                <Icons.FontAwesome5
                  name="times"
                  color={color.white}
                  size={20}
                />
              </TouchableOpacity>
            </View>

            {selectedProduct && (
              <ScrollView showsVerticalScrollIndicator={false}>
                <TouchableOpacity
                  style={styles.productImageContainer}
                  onPress={handleFilePick}>
                  {selectedProduct.image_path === null ? (
                    <Image
                      style={styles.productImage}
                      resizeMode="contain"
                      source={{uri: 'https://dummyimage.com/hd1080'}}
                    />
                  ) : (
                    <Image
                      style={styles.productImage}
                      resizeMode="contain"
                      source={{
                        uri: `${Img_URL_USER}${selectedProduct.image_path}`,
                      }}
                    />
                  )}
                </TouchableOpacity>

                <View style={styles.productDetails}>
                  <TextInput
                    style={styles.productNameInput}
                    value={selectedProduct.name}
                    onChangeText={text =>
                      setSelectedProduct({...selectedProduct, name: text})
                    }
                  />
                  <TextInput
                    style={styles.productDescriptionInput}
                    value={selectedProduct.description}
                    onChangeText={text =>
                      setSelectedProduct({
                        ...selectedProduct,
                        description: text,
                      })
                    }
                  />
                  <View style={styles.productStats}>
                    <View style={styles.statItem}>
                      <Text style={styles.statLabel}>Price</Text>
                      <TextInput
                        style={styles.statValueInput}
                        value={`${selectedProduct.price}`}
                        onChangeText={text =>
                          setSelectedProduct({
                            ...selectedProduct,
                            price: parseFloat(text),
                          })
                        }
                      />
                    </View>
                    <View style={styles.statItem}>
                      <Text style={styles.statLabel}>Stock</Text>
                      <TextInput
                        style={styles.statValueInput}
                        value={`${selectedProduct.stock}`}
                        onChangeText={text =>
                          setSelectedProduct({
                            ...selectedProduct,
                            stock: parseInt(text, 10),
                          })
                        }
                      />
                    </View>
                  </View>
                </View>
                <View style={styles.btnContainer}>
                  <BtnComp
                    btnText="Save"
                    BtnStyle={styles.BtnStyle}
                    onPressFunc={handleUpdateProduct}
                  />
                </View>
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SellerDashBoard;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: color.white,
    borderRadius: 10,
    width: '90%',
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: color.default,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  modalTitle: {
    color: color.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  productImageContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  productImage: {
    width: '80%',
    height: 200,
  },
  productDetails: {
    padding: 20,
  },
  productNameInput: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: color.gray,
  },
  productDescriptionInput: {
    fontSize: 16,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: color.gray,
  },
  productStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: color.gray,
  },
  statValueInput: {
    fontSize: 16,
    fontWeight: 'bold',
    borderBottomWidth: 1,
    borderBottomColor: color.gray,
    paddingVertical: 5,
    textAlign: 'center',
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: 10,
  },
  BtnStyle: {
    width: '47%',
    marginBottom: '10%',
  },
});
