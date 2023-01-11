class APIUtils
{

    constructor(apiContext,loginpayload)
        {
            this.apiContext = apiContext;
            this.loginpayload = loginpayload;
        }


   async getToken()
    {

        const loginResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login',
        {
            data: this.loginpayload
        })
    //Getting the json from response
    const loginResponseJson = await loginResponse.json();
    // Taking only the token from the json response
    const token = loginResponseJson.token;
    console.log(token);
    return token;

    }

    async createOrder(orderPayLoad)
    {

        let response = {};
        response.token = await this.getToken();
        const orderResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order', {
        data: orderPayLoad,
        headers: {

            'Authorization':  response.token,
            'Content-Type': 'application/json'

                }
    })
    const orderResponseJson = await orderResponse.json();
    console.log(orderResponseJson);
    const orderId = orderResponseJson.orders[0]
    response.orderId = orderId;


    return response;


    }
}

module.exports = {APIUtils};