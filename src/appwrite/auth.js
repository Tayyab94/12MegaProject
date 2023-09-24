/* eslint-disable no-useless-catch */
/* eslint-disable no-unused-vars */
import Config from './conf/config';
import { Client, Account, ID } from "appwrite";


export class AuthService {

    Client = new Client()
    account;

    constructor() {
        this.Client.setEndpoint(Config.appWriteUrl).setProject(Config.appWriteProjectId);
        this.account = new Account(this.Client);
    }

    async createAccount({ email, password, name }) {
        try {
            /* The line `await this.account.create(ID.unique(), email, password, name)` is calling the
            `create` method of the `account` object. This method is used to create a new user account
            in the Appwrite backend. It takes four parameters: `ID.unique()`, which generates a unique
            identifier for the account, `email` for the user's email address, `password` for the user's
            password, and `name` for the user's name. The `await` keyword is used to wait for the
            asynchronous operation to complete before moving on to the next line of code. */
            const userAccount = await this.account.create(ID.unique(), email, password, name);

            if (userAccount) {
                // call an-other method
                return this.LoginUser(email, password)
            }
            else {
                return userAccount;
            }
        } catch (error) {
            throw error;
        }

    }

    async LoginUser({ email, password }) {
        try {
            const userLogin = await this.account.createEmailSession(email, password);
            if (userLogin) {
                return;
            }
            else {
                return
            }
        } catch (error) {
            throw error;
        }
    }

    async GetCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite Service :: GetCurrentUser:: error", error)
        }
        return null;
    }

    async Logout() {
        try {

            // we can use this to delete all sessions
            // await this.account.deleteSessions(); 

            return await this.account.deleteSession("current");
        } catch (error) {
            console.log("Appwrite Service::  Logout:: error", error);
        }
    }
}



const authService = new AuthService();


export default authService;


