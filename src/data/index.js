import backendOrigin from "../config/origins";
import uuid from "react-uuid";

export default class Database {
	/**
	 * Basic function to fetch model with params
	 * @param model {string}
	 * @param params {json}
	 */
	static async _getModel(model, params) {
		let time = Date.now();
		const response = await fetch(`${backendOrigin}/${model}`, params)
			.then((res) => res.json())
			.then((json) => {
				return json;
			})
			.catch((err) => {
				console.log(err);
			});
		return response;
	}

	/**
	 * Gets all menu items
	 */
	static async getMenuItems() {
		let res = await this._getModel("menu");
		return res;
	}

	/**
	 * Gets menu item by name
	 * @param name {string}
	 */
	static async getMenuItemByName(name) {
		let res = await this._getModel(`menu/name/${name}`);
		return res;
	}

	/**
	 * Gets all menu items in order for order
	 * @param order_id {number}
	 */
	static async getMenuItemsForOrder(order_id) {
		let res = await this._getModel(`menu/order/${order_id}`);
		return res;
	}

	/**
	 * Gets all inventory items
	 */
	static async getInventoryItems() {
		let res = await this._getModel("inventory");
		return res;
	}

	/**
	 * Gets all orders
	 */
	static async getOrders() {
		let res = await this._getModel("orders");
		return res;
	}

	/**
	 * Gets all staff
	 */
	static async getStaff() {
		let res = await this._getModel("staff");
		return res;
	}

	/**
	 * Gets all recent orders
	 */
	static async getRecentOrders() {
		let res = await this._getModel("orders/recent");
		return res;
	}

	/**
	 * Posts new order with parameters
	 * @param cost_total {number}
	 * @param timestamp {date}
	 * @param customer_id {number}
	 * @param staff_id {number}
	 * @param menu_items {array}
	 */
	static async makeOrder(
		cost_total,
		timestamp,
		customer_id,
		staff_id,
		menu_items
	) {
		const response = await fetch(`${backendOrigin}/orders/makeorder`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				cost_total: cost_total,
				timestamp: timestamp,
				customer_id: customer_id,
				staff_id: staff_id,
				menu_items: menu_items,
			}),
		})
			.then((res) => res.json())
			.catch((err) => console.log(err));
		return response;
	}

	/**
	 * Posts new menu item with parameters
	 * @param name {string}
	 * @param price {number}
	 * @param type {string}
	 * @param inventory_items {array}
	 */
	static async addMenuItem(name, price, type, inventory_items) {
		const response = await fetch(`${backendOrigin}/menu/add`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name: name,
				price: price,
				type: type,
				inventory_items: inventory_items,
			}),
		})
			.then((res) => res.json())
			.catch((err) => console.log(err));
		return response;
	}

	/**
	 * Posts to remove menu item with menu_id from the menu
	 * @param menu_id {number}
	 */
	static async removeMenuItem(menu_id) {
		const response = await fetch(`${backendOrigin}/menu/remove`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				menu_id: menu_id,
			}),
		})
			.then((res) => res.json())
			.catch((err) => console.log(err));
		return response;
	}

	/**
	 * Posts new price for menu item with name
	 * @param name {string}
	 * @param newPrice {number}
	 */
	static async updateMenuPriceByName(name, newPrice) {
		const response = await fetch(`${backendOrigin}/menu/edit/price`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name: name,
				newPrice: newPrice,
			}),
		})
			.then((res) => res.json())
			.catch((err) => console.log(err));
		return response;
	}

	/**
	 * Posts new quantity of inventory item with name
	 * @param name {string}
	 * @param quantity {number}
	 */
	static async updateInventoryQuantityByName(name, quantity) {
		const response = await fetch(
			`${backendOrigin}/inventory/edit/quantity`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name: name,
					quantity: quantity,
				}),
			}
		)
			.then((res) => res.json())
			.catch((err) => console.log(err));
		return response;
	}

	/**
	 * Posts new staff member with params
	 * @param restaurant_id {number}
	 * @param is_manager {boolean}
	 * @param name {string}
	 * @param email {string}
	 */
	static async addStaffMember(restaurant_id, is_manager, name, email) {
		const response = await fetch(`${backendOrigin}/staff/add`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				restaurant_id: restaurant_id,
				is_manager: is_manager,
				name: name,
				email: email,
			}),
		})
			.then((res) => res.json())
			.catch((err) => console.log(err));
		return response;
	}

	/**
	 * Makes new order with parameters
	 * @param cost_total {number}
	 * @param timestamp {date}
	 * @param customer_id {number}
	 * @param staff_id {number}
	 * @param menu_items {array}
	 */
	static async postGoogleAuth(params) {
		const message = await fetch(`${backendOrigin}/auth/google-login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(params),
		})
			.then((res) => res.json())
			.catch((err) => console.log(err));
		return message;
	}

	/**
	 * Gets restock report
	 * @param minimumQty {number}
	 */
	static async getRestockReport(minimumQty) {
		// console.log(minimumQty);
		const response = await fetch(
			`${backendOrigin}/restaurant/restockreport?minimumQty=${minimumQty}`
		)
			.then((res) => res.json())
			.then((json) => {
				return json;
			})
			.catch((err) => {
				console.log(err);
			});
		return response;
	}

	/**
	 * Gets sales report between sDate and eDate
	 * @param sDate {date}
	 * @param eDate {date}
	 */
	static async getSalesReport(sDate, eDate) {
		const response = await fetch(
			`${backendOrigin}/restaurant/salesreport?sDate=${sDate}&eDate=${eDate}`
		)
			.then((res) => res.json())
			.catch((err) => console.log(err));
		return response;
	}

	/**
	 * Gets excess report with timestamp
	 * @param timestamp {date}
	 */
	static async getExcessReport(timestamp) {
		const response = await fetch(
			`${backendOrigin}/restaurant/excessreport?timestamp=${timestamp}`
		)
			.then((res) => res.json())
			.catch((err) => console.log(err));
		return response;
	}

	/**
	 * Gets x report
	 */
	static async getXReport() {
		const response = await fetch(`${backendOrigin}/restaurant/xreport`)
			.then((res) => res.json())
			.catch((err) => console.log(err));
		return response;
	}

	/**
	 * Gets z report
	 */
	static async getZReport() {
		const response = await fetch(`${backendOrigin}/restaurant/zreport`)
			.then((res) => res.json())
			.catch((err) => console.log(err));
		return response;
	}
}
