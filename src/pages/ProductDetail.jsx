import React, { useState } from "react";
import { Card, Button, Typography, Space, Image, Tag, message } from "antd";
import {
  ShoppingCartOutlined,
  HeartOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, addToWishlist } from "../redux/reduces/wishlistCartSlice";

const { Title, Paragraph } = Typography;

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const [addedToCart, setAddedToCart] = useState(false);
  const [addedToWishList, setAddedTowishList] = useState(false);

  const product = products.find((prod) => prod.id === Number(id));

  if (!product) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <Title level={4}>Product not found!</Title>
        <Button
          type="primary"
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate(-1)}
        >
          Go Back
        </Button>
      </div>
    );
  }

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    message.success("Added to cart successfully!");
    setAddedToCart(true);
  };

  const handleAddToWishlist = () => {
    dispatch(addToWishlist(product));
    message.success("Added to wishlist successfully!");
    setAddedTowishList(true);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "1000px", margin: "0 auto" }}>
      <Button
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate(-1)}
        style={{ marginBottom: "20px" }}
      >
        Back to Products
      </Button>
      <Card>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
          <div style={{ flex: "1 1 300px" }}>
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              style={{ width: "100%", height: "auto", objectFit: "cover" }}
            />
          </div>
          <div style={{ flex: "1 1 300px" }}>
            <Space direction="vertical" size="large" style={{ width: "100%" }}>
              <Title level={2}>{product.name}</Title>
              <Title level={3}>${product.price.toFixed(2)}</Title>
              <Tag color="blue">{product.category || "Uncategorized"}</Tag>
              <Paragraph>
                {product.description || "No description available."}
              </Paragraph>
              <>
                {addedToCart ? (
                  <Button type="default" onClick={() => navigate("/cart")}>
                    Go to Cart
                  </Button>
                ) : (
                  <Button
                    type="primary"
                    icon={<ShoppingCartOutlined />}
                    onClick={handleAddToCart}
                  >
                    Add to Cart
                  </Button>
                )}
              </>
              {addedToWishList ? (
                <Button type="default" onClick={() => navigate("/wishlist")}>
                  Go to wishlist
                </Button>
              ) : (
                <Button
                  type="default"
                  icon={<HeartOutlined />}
                  onClick={handleAddToWishlist}
                >
                  Add to Wishlist
                </Button>
              )}
            </Space>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProductDetail;
