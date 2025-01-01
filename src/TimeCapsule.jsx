import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid } from "@mui/material";
import DisplayCards from "./DisplayCards";
import { useNavigate } from "react-router";

function TimeCapsule({ date }) {
  const [youtubeVideos, setYoutubeVideos] = useState([]);
  const [instagramPhotos, setInstagramPhotos] = useState([]);
  const [newsArticles, setNewsArticles] = useState([]);
  const [amazonProducts, setAmazonProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch YouTube videos
    axios
      .get(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${date}&type=video&key=YOUR_YOUTUBE_API_KEY`
      )
      .then((response) => {
        setYoutubeVideos(response.data.items);
      })
      .catch((error) => {
        console.error(error);
      });

    // Fetch Instagram photos
    axios
      .get(`https://www.instagram.com/explore/tags/${date}/?__a=1`)
      .then((response) => {
        setInstagramPhotos(
          response.data.graphql.hashtag.edge_hashtag_to_media.edges
        );
      })
      .catch((error) => {
        console.error(error);
      });

    // Fetch news articles
    axios
      .get(
        `https://newsapi.org/v2/everything?q=${date}&apiKey=YOUR_NEWS_API_KEY`
      )
      .then((response) => {
        setNewsArticles(response.data.articles);
      })
      .catch((error) => {
        console.error(error);
      });

    // Fetch Amazon products
    axios
      .get(
        `https://webservices.amazon.com/onca/xml?Service=AWSECommerceService&Operation=ItemSearch&Keywords=${date}&ResponseGroup=ItemAttributes&SearchIndex=All&AssociateTag=YOUR_AMAZON_ASSOCIATE_TAG`
      )
      .then((response) => {
        const products = response.data.getElementsByTagName("Item");
        const productList = [];

        for (let i = 0; i < products.length; i++) {
          const product = products[i];

          const title = product.getElementsByTagName("Title")[0].textContent;
          const price =
            product.getElementsByTagName("FormattedPrice")[0].textContent;
          const imageUrl = product
            .getElementsByTagName("MediumImage")[0]
            .getElementsByTagName("URL")[0].textContent;

          productList.push({ title, price, imageUrl });
        }

        setAmazonProducts(productList);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [date]);
  return (
    <Grid>

    </Grid>
  );
}

export default TimeCapsule;
