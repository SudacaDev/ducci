const ProductsPageContent = () => {

    const PROD = [
        {
            id: '',
            name: '',
            price: '00,00',
            description: 'desc'
        }
    ]

    return (
        <div className="h-full bg-white overflow-hidden ">
            <div className="h-[100]"> small banner </div>
            <div className="grid grid-cols-[240px_1fr] gap-2 bg-green-50 h-full container m-auto">
                <div className="bg-green-100"> aside </div>
                <div className="bg-green-200 flex flex-col">
                    <div> filters </div>
                    <div className="products-list-container">
                        {[...Array(30)].map((item) => (
                             <div key={item} >
                            <div> imagen </div>
                            <div> nombre</div>
                            <div> desc</div>
                        </div>
                        ))}
                       
                        
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ProductsPageContent