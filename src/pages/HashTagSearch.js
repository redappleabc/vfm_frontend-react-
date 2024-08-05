import { Breadcrumb } from 'antd';
import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import ItemCard from "../components/card/ItemCard/ItemCard";
import SearchBox from "../components/common/searchBox";
import { PaginationButtons } from "../components/common/pagination";
import SetKwd from '../components/searchTag/index';
import stringSimilarity from 'string-similarity';

function Hashtagsearch() {
    const { products } = useSelector(state => state.common);
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        setFilteredProducts(products);
    }, [products]);

    

    const handleSearch = (searchQuery) => {
        const calculateSimilarity = (field, query) => {
            return stringSimilarity.compareTwoStrings(field?.toLowerCase() || '', query);
        };

        const productsWithScores = products.map(product => {
            const nameScore = calculateSimilarity(product.name, searchQuery);
            const categoryScore = calculateSimilarity(product.category?.name, searchQuery);
            const hashScore = calculateSimilarity(product.hash_tag, searchQuery);
            const maxScore = Math.max(nameScore, categoryScore, hashScore);

            return { product, score: maxScore };
        });

        const sortedProducts = productsWithScores.sort((a, b) => b.score - a.score);
        const top5Products = sortedProducts.slice(0, 5).map(item => item.product);

        setFilteredProducts(top5Products);
    };


    return (
        <>
            <Breadcrumb
                className="p-5"
                separator=">"
                items={[
                    {
                        title: 'TOP_PAGE',
                        href: '/'
                    },
                    {
                        title: 'HASH_TAG_SEARCH',
                    },
                ]}
            />
            <SetKwd onSearch={handleSearch} />
            <div className="gap-10 p-20 flex flex-wrap justify-center">

                {filteredProducts?.length ? filteredProducts?.map((item, index) => (
                    <ItemCard key={index} {...item} />
                )) : <div className="h-60 pt-20"> <p className="text-gray text-3xl">No Result</p> </div>}
            </div>
            <PaginationButtons />
        </>
    );
}

export default Hashtagsearch;
