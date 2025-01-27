import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    Paper,
    TextField,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    Box,
    Button,
    Container,
    Grid,
    useMediaQuery,
    Typography
} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Products = () => {
    // States for products, current page, and filters
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(0);
    const [totalProducts, setTotalProducts] = useState(0);
    const [search, setSearch] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const rowsPerPage = 10; // Set rows per page

    // Fake categories (for simulation purposes)
    const categories = ['electronics', 'jewelery', 'men\'s clothing', 'women\'s clothing'];

    // Fetch products function with filters
    const fetchProducts = async (page, search, category, startDate, endDate) => {
        const response = await axios.get(
            `https://fakestoreapi.com/products?limit=${rowsPerPage}&page=${page + 1}`
        );
        let filteredProducts = response.data;

        // Simulate date field for each product (using random dates for this demo)
        filteredProducts = filteredProducts.map(product => {
            const randomDate = new Date(
                Date.now() - Math.floor(Math.random() * 10000000000) // Random date within the last 3 months
            );
            return { ...product, date: randomDate.toISOString() };
        });

        // Search filter
        if (search) {
            filteredProducts = filteredProducts.filter(product =>
                product.title.toLowerCase().includes(search.toLowerCase())
            );
        }

        // Category filter
        if (category) {
            filteredProducts = filteredProducts.filter(product => product.category === category);
        }

        // Start and end date filter
        if (startDate && endDate) {
            filteredProducts = filteredProducts.filter(product => {
                const productDate = new Date(product.date);
                return productDate >= new Date(startDate) && productDate <= new Date(endDate);
            });
        }

        setProducts(filteredProducts);
        setTotalProducts(filteredProducts.length); // Total filtered products
    };

    useEffect(() => {
        fetchProducts(page, search, categoryFilter, startDate, endDate);
    }, [page, search, categoryFilter, startDate, endDate]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleRefresh = () => {
        // Clear all filters
        setSearch('');
        setCategoryFilter('');
        setStartDate('');
        setEndDate('');

        // Fetch all products without filters
        fetchProducts(0, '', '', '', '');
    };

    const isMobile = useMediaQuery('(max-width:600px)');

    return (
        <div style={{ backgroundColor: "#F6F6FA" }}>
            <p style={{ color: "#F66300", marginLeft: "20px" }}>
                <ArrowBackIcon />
                <b><sup>Go Back</sup></b>
            </p>
            <Typography variant="h5" style={{ marginLeft: "40px", fontSize: isMobile ? '20px' : '30px' }}>
                All Customers
            </Typography>
            <Container>
                {/* Filters Section */}
                <Box display="flex" flexDirection={isMobile ? "column" : "row"} alignItems="center" justifyContent="space-between" margin="20px">
                    <TextField
                        label="Search Products"
                        variant="outlined"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{ width: isMobile ? "100%" : "300px", backgroundColor: "white", marginBottom: isMobile ? "10px" : "0" }}
                    />
                    <FormControl style={{ width: isMobile ? "100%" : "200px", marginBottom: isMobile ? "10px" : "0" }}>
                        <InputLabel>Category</InputLabel>
                        <Select
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                            label="Category" style={{ backgroundColor: "white" }}
                        >
                            <MenuItem value="">All</MenuItem>
                            {categories.map((category, index) => (
                                <MenuItem key={index} value={category}>
                                    {category}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        label="Start Date"
                        variant="outlined"
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        style={{ width: isMobile ? "100%" : "200px", backgroundColor: "white", marginBottom: isMobile ? "10px" : "0" }}
                    />
                    <TextField
                        label="End Date"
                        variant="outlined"
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        style={{ width: isMobile ? "100%" : "200px", backgroundColor: "white", marginBottom: isMobile ? "10px" : "0" }}
                    />
                    {/* Refresh button that clears all filters */}
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleRefresh}
                        style={{ width: isMobile ? "100%" : "auto" }}
                    >
                        Refresh
                    </Button>
                </Box>

                {/* Display product filter status */}
                <span style={{ fontFamily: 'Arial, sans-serif', color: "#F66300", textDecorationLine: "underline", fontSize: "15px" }}>APPROVED</span>
                <span style={{ fontSize: "15px", fontFamily: 'Arial, sans-serif', marginLeft: "15px" }}>NOT APPROVED</span>
                <br />

                {/* Product Table */}
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Title</TableCell>
                                <TableCell>Category</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>Date</TableCell> {/* New column for Date */}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products.map((product) => (
                                <TableRow key={product.id}>
                                    <TableCell>{product.id}</TableCell>
                                    <TableCell>{product.title}</TableCell>
                                    <TableCell>{product.category}</TableCell>
                                    <TableCell>${product.price}</TableCell>
                                    <TableCell>{new Date(product.date).toLocaleDateString()}</TableCell> {/* Display formatted date */}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* Pagination */}
                <TablePagination
                    component="div"
                    count={totalProducts}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    rowsPerPageOptions={[]}
                />
            </Container>
        </div>
    );
};

export default Products;
