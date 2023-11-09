import { TitleComponent } from './Title/Title';
import { useContext, useEffect, useState } from 'react';
import { Product } from './Product/Product';
import { productsData } from 'Data/productsData';
import css from './App.module.css';
import Section from './Section/Section';
import Modal from './Modal/Modal';
import ProductForm from './ProductForm/ProductForm';
import { nanoid } from 'nanoid';
import { ModalContext } from 'context/ModalContext';

export const App = () => {
  const [products, setProducts] = useState(() => {
    const stringifiedProducts = localStorage.getItem('products');
    const parsedProducts = JSON.parse(stringifiedProducts) ?? productsData;
    return parsedProducts;
  });

  const { isOpenModal } = useContext(ModalContext);

  useEffect(() => {
    const stringifiedProducts = JSON.stringify(products);
    localStorage.setItem('products', stringifiedProducts);
  }, [products]);

  const handleAddProduct = productData => {
    const hasDuplicates = products.some(
      product => product.title === productData.title
    );
    if (hasDuplicates) {
      return alert(
        `Oops, product with title '${productData.title}' already exist!`
      );
    }

    const finalProduct = {
      ...productData,
      id: nanoid(),
    };

    // setProducts(prevState => {[...prevState, finalProduct]});
    setProducts([finalProduct, ...products]);
  };
  const hendleDeleteProduct = productId => {
    // this.setState({
    //   products: this.state.products.filter(product => product.id !== productId),
    // });

    setProducts(products.filter(product => product.id !== productId));
  };

  const sortedProducts = [...products].sort((a, b) => a.price - b.price);
  return (
    <div>
      <Section>
        <TitleComponent />
      </Section>
      <Section>
        <ProductForm handleAddProduct={handleAddProduct} />
      </Section>

      <Section title="Product List">
        <div className={css.productList}>
          {sortedProducts.map(({ id, title, price, discount }) => {
            return (
              <Product
                key={id}
                id={id}
                title={title}
                price={price}
                discount={discount}
                hendleDeleteProduct={hendleDeleteProduct}
              />
            );
          })}
        </div>
      </Section>

      {isOpenModal && <Modal />}
    </div>
  );
};
