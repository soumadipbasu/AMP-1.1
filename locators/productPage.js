
export const productPagelocators = {
    firstProduct: 'a[href="/product_details/1"]',
    secondProduct: 'a[href="/product_details/2"]',
    continueShopping: '.btn.btn-success.close-modal.btn-block',
    viewFirstProduct: 'a[href="/product_details/1"]',
    viewSecondProduct: 'a[href="/product_details/2"]',
    addTocart: 'button[type="button"]',
    viewCart: 'a[href="/view_cart"]',
    firstProductCartPrice: 'tr[id="product-1"] p[class="cart_total_price"]',
    secondProductCartPrice: 'tr[id="product-2"] p[class="cart_total_price"]',
    checkout: '.btn.btn-default.check_out',
    totalAmount: 'tbody tr td:nth-child(4) p:nth-child(1)',
    cartTotal: '.cart_total_price',
    removeCartProduct: '.fa.fa-times',
    cartProductTable: 'tbody',
    home: '//ul[@class="nav navbar-nav"]//a[normalize-space()="Home"]',
    cartEmpty: 'p[class="text-center"] b'
};