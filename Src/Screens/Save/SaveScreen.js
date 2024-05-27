import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Alert,
  Modal,
  Button,
  ToastAndroid,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import HeaderWithSearchFilter from '../../Components/HeaderWithSearchFilter';
import {BASE_URL} from '../Signin/Signin';
import BtnComp from '../../Components/BtnComp';
import Icon, {Icons} from '../../Components/Icons'; // Import custom Icon component
import color from '../../Assets/colors/colors';

const {height, width} = Dimensions.get('window');

const ProductsScreen = props => {
  const navigation = useNavigation();
  const [productList, setProductList] = useState([
    {
      product_id: '1',
      name: 'Product One',
      price: 10.0,
      image: 'product1.jpg',
      rating: '4.5',
    },
    {
      product_id: '2',
      name: 'Product Two',
      price: 20.0,
      image: 'product2.jpg',
      rating: '4.0',
    },
    {
      product_id: '3',
      name: 'Product Three',
      price: 15.0,
      image: 'product3.jpg',
      rating: '4.8',
    },
  ]);
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [cartVisible, setCartVisible] = useState(false);

  const addToCart = item => {
    const exists = cart.some(
      cartItem => cartItem.product_id === item.product_id,
    );
    if (exists) {
      ToastAndroid.show(
        `Product ${item.name} is already in the cart!`,
        ToastAndroid.SHORT,
      );
    } else {
      setCart(prev => [...prev, {...item, quantity: 1}]);
      ToastAndroid.show(
        `Product ${item.name} added to cart!`,
        ToastAndroid.SHORT,
      );
    }
  };

  const increaseQuantity = product_id => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.product_id === product_id
          ? {...item, quantity: item.quantity + 1}
          : item,
      ),
    );
  };

  const decreaseQuantity = product_id => {
    setCart(prevCart =>
      prevCart
        .map(item =>
          item.product_id === product_id
            ? {...item, quantity: item.quantity - 1}
            : item,
        )
        .filter(item => item.quantity > 0),
    );
  };

  const clearCart = () => {
    setCart([]);
    setCartVisible(false);
  };

  const totalBill = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const filteredData = productList.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // const removefavouritem = async pid => {
  //   console.log('remove id', pid);
  //   const updatedFavouritelist = favouritelist.filter(
  //     item => item.provider_id !== pid,
  //   );
  //   setfavouritlist(updatedFavouritelist);

  //   try {
  //     var myHeaders = new Headers();
  //     myHeaders.append('Cookie', 'PHPSESSID=qhabj34eqn4k9p23vmoeqoa5th');

  //     var formdata = new FormData();
  //     formdata.append('user_id', global.id);
  //     formdata.append('provider_id', pid);
  //     formdata.append('status', '0');

  //     var requestOptions = {
  //       method: 'POST',
  //       headers: myHeaders,
  //       body: formdata,
  //       redirect: 'follow',
  //     };
  //     const apiurl = `${BASE_URL}user/favorite_status_update.php`;

  //     const response = await fetch(apiurl, requestOptions);
  //     const result = await response.json();

  //     if (result) {
  //       console.log('bookmark status changes', result);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   const getFavourite = async () => {
  //     try {
  //       var myHeaders = new Headers();
  //       myHeaders.append('Cookie', 'PHPSESSID=qhabj34eqn4k9p23vmoeqoa5th');

  //       var formdata = new FormData();
  //       formdata.append('user_id', global.id);

  //       var requestOptions = {
  //         method: 'POST',
  //         headers: myHeaders,
  //         body: formdata,
  //         redirect: 'follow',
  //       };
  //       const apiurl = `${BASE_URL}user/get_favorite_provider.php`;

  //       const response = await fetch(apiurl, requestOptions);
  //       const result = await response.json();
  //       if (result && result.favorite_providers) {
  //         console.log('result.favorite_providers', result?.favorite_providers);
  //         setfavouritlist(result?.favorite_providers);
  //       } else if (result.error) {
  //         Alert.alert(result.error);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   getFavourite();
  // }, [foucus]);

  return (
    <>
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
        screen={'user'}
      />
      <View style={styles.container}>
        <FlatList
          data={filteredData}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          columnWrapperStyle={styles.row}
          renderItem={({item}) => (
            <View style={styles.productCard}>
              <Image
                source={{uri: `${BASE_URL}uploads/${item.image}`}}
                style={styles.productImage}
              />
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
              <Text style={styles.productRating}>Rating: {item.rating}</Text>
              <BtnComp
                BtnStyle={styles.BtnStyle}
                btnText={'Add to Cart'}
                onPressFunc={() => addToCart(item)}
              />
            </View>
          )}
        />
        <TouchableOpacity
          style={styles.fab}
          onPress={() => setCartVisible(true)}>
          <Icon type={Icons.FontAwesome} name="shopping-cart" color="#fff" />
          {cart.length > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{cart.length}</Text>
            </View>
          )}
        </TouchableOpacity>
        <Modal
          visible={cartVisible}
          animationType="slide"
          onRequestClose={() => setCartVisible(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Cart</Text>
              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={() => setCartVisible(false)}>
                <Icon
                  type={Icons.FontAwesome}
                  name="times"
                  color={color.default}
                  size={20}
                />
              </TouchableOpacity>
            </View>
            {cart.length === 0 ? (
              <Text style={styles.emptyCartText}>Your cart is empty.</Text>
            ) : (
              <FlatList
                data={cart}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => (
                  <View style={styles.cartItem}>
                    <Image
                      source={{uri: `${BASE_URL}uploads/${item.image}`}}
                      style={styles.cartItemImage}
                    />
                    <View style={styles.cartItemDetails}>
                      <Text style={styles.cartItemName}>{item.name}</Text>
                      <View style={styles.quantityContainer}>
                        <TouchableOpacity
                          style={styles.quantityButton}
                          onPress={() => decreaseQuantity(item.product_id)}>
                          <Text style={styles.quantityButtonText}>-</Text>
                        </TouchableOpacity>
                        <Text style={styles.cartItemQuantity}>
                          {item.quantity}
                        </Text>
                        <TouchableOpacity
                          style={styles.quantityButton}
                          onPress={() => increaseQuantity(item.product_id)}>
                          <Text style={styles.quantityButtonText}>+</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                    <Text style={styles.cartItemPrice}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </Text>
                  </View>
                )}
              />
            )}
            <View style={styles.totalContainer}>
              <Text style={styles.totalLabel}>Total:</Text>
              <Text style={styles.totalAmount}>${totalBill.toFixed(2)}</Text>
            </View>
            <View style={styles.modalButtons}>
              <BtnComp
                BtnStyle={styles.modalBtn}
                btnText={'Clear Cart'}
                onPressFunc={clearCart}
              />
              <BtnComp
                BtnStyle={styles.modalBtn}
                btnText={'Pay Bill'}
                onPressFunc={() =>
                  Alert.alert(
                    'Payment',
                    `Total bill is $${totalBill.toFixed(2)}`,
                  )
                }
              />
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
};

export default ProductsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    marginVertical: 50,
  },
  row: {
    flex: 1,
    justifyContent: 'space-between',
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    width: width / 2 - 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  productImage: {
    width: '100%',
    height: 100,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: color.darkgreen,
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 14,
    color: '#888',
    marginBottom: 5,
  },
  productRating: {
    fontSize: 14,
    color: '#888',
    marginBottom: 10,
  },
  BtnStyle: {
    marginTop: 15,
    width: '90%',
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: color.default,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  cartBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'red',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  modalCloseButton: {
    padding: 10,
  },
  emptyCartText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 10,
  },
  cartItemImage: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  cartItemDetails: {
    flex: 1,
  },
  cartItemName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: color.default,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  quantityButtonText: {
    fontSize: 20,
    color: color.white,
    fontWeight: 'bold',
  },
  cartItemQuantity: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  cartItemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginVertical: 20,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  modalBtn: {
    flex: 1,
    marginHorizontal: 5,
  },
});
