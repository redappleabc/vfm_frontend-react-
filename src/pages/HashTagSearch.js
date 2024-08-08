import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { Breadcrumb, Select } from 'antd';
import ItemCard from "../components/card/ItemCard/ItemCard";
import SearchBox from "../components/common/searchBox";
import { PaginationButtons } from "../components/common/pagination";
import SetKwd from '../components/searchTag/index';
import stringSimilarity from 'string-similarity';

const { Option } = Select;

function Hashtagsearch() {
    const { products } = useSelector(state => state.common);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [sortedResults, setSortedResults] = useState([]);

    useEffect(() => {
        console.log(products)
        setFilteredProducts(products);
        setSortedResults(products);
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

    const handleSortChange = (value) => {
        let sortedData;
        switch (value) {
            case 'newest':
                sortedData = [...filteredProducts].sort((a, b) => new Date(b.date) - new Date(a.date));
                break;
            case 'high-price':
                sortedData = [...filteredProducts].sort((a, b) => b.price - a.price);
                break;
            case 'low-price':
                sortedData = [...filteredProducts].sort((a, b) => a.price - b.price);
                break;
            default:
                sortedData = filteredProducts;
        }
        setSortedResults(sortedData);
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
           
            <div className="flex flex-row justify-end mr-20">
                <Select defaultValue="newest" style={{ width: 200 }} onChange={handleSortChange}>
                        <Option value="newest">新着順</Option>
                        <Option value="high-price">価格が高い順</Option>
                        <Option value="low-price">価格が低い順</Option>
                    </Select>
            </div>
            <div className="gap-10 p-20 flex flex-wrap justify-center">
               
                {sortedResults?.length ? sortedResults?.map((item, index) => (
                    <ItemCard key={index} {...item} />
                )) : <div className="h-60 pt-20"> <p className="text-gray text-3xl">No Result</p> </div>}
            </div>
            <PaginationButtons />
        </>
    );
}

export default Hashtagsearch;
