
                <FlatList
                    data = {this.state.storeList}
                    renderItem = {
                        ({item})=><TouchableOpacity style={styles.content}>
                            <View style={styles.icon}>
                                <Image 
                                    style = {styles.image}
                                    source={{uri:item.storeImage}}
                                />
                            </View>
                            <View style={styles.pleft}>
                                  <Text style={styles.wrap,styles.title}>{item.storeName +this.state.userId}</Text>
                                  <Text style={styles.wrap}>{item.storeAddress}</Text>
                            </View>
                        </TouchableOpacity>
                    }
                    keyExtractor={(item, index) => index.toString()}
                />