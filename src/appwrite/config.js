/* eslint-disable no-useless-catch */
/* eslint-disable no-unused-vars */
import Config from './conf/config';
import { Client, Databases, ID, Storage, Query } from "appwrite";


export class Service {
    Client = new Client();
    databases;
    storage;

    constructor() {
        this.Client.setEndpoint(Config.appWriteUrl).setProject(Config.appWriteProjectId);

        this.databases = new Databases(this.Client);
        this.storage = new Storage(this.Client);
    }

    async CretePost({ title, slug, content, featuredImage, status, userId }) {
        try {

            return await this.databases.createDocument(Config.appWriteDatabaseId, Config.appWriteCollectionId, slug, {
                title,
                content,
                featuredImage,
                status,
                userId
            });


        } catch (error) {
            console.log("Appwrite Service :: CreatePost :: error ", error);
        }
    }


    async UpdatePost(slug, { title, content, featuredImage, status }) {
        try {

            return await this.databases.updateDocument(Config.appWriteDatabaseId, Config.appWriteCollectionId
                , slug, {
                title,
                content,
                featuredImage,
                status
            });

        } catch (error) {
            console.log("Appwrite Service :: UpdatePost :: error ", error);
        }
    }

    async DeletePost(slug) {
        try {

            await this.databases.deleteDocument(Config.appWriteDatabaseId, Config.appWriteCollectionId, slug);
            return true;
        } catch (error) {
            console.log("Appwrite Service :: DeletePost :: error ", error);
            return false;
        }
    }

    async getSinlePost(slug) {
        try {

            await this.databases.getDocument(Config.appWriteDatabaseId, Config.appWriteCollectionId, slug);
            return true;
        } catch (error) {
            console.log("Appwrite Service :: DeletePost :: error ", error);
            return false;
        }
    }


    async GetPots(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(Config.appWriteDatabaseId,
                Config.appWriteCollectionId, queries);

        } catch (error) {
            console.log("Appwrite Service :: getPots :: error ", error);

        }
    }



    // File Upload 

    async UploadFile(file) {
        try {
            return await this.storage.createFile(Config.appWriteBucketId, ID.unique(), file)
        } catch (error) {
            console.log("Appwrite Service :: UploadFile :: error ", error);
            return false;
        }
    }

    async DeleteFile(fileId) {
        try {

            return await this.storage.deleteFile(Config.appWriteBucketId, fileId);
        } catch (error) {
            console.log("Appwrite Service :: DeleteFile :: error ", error);
            return false;
        }
    }

    GetFilePreview(fileId) {
        try {
            return this.storage.getFilePreview(Config.appWriteBucketId, fileId)
        } catch (error) {
            console.log("Appwrite Service :: GetFilePreview :: error ", error);
            return false;
        }
    }

    GetFileForDownload(fileId) {
        try {
            return this.storage.getFileDownload(Config.appWriteBucketId, fileId);
        } catch (error) {
            console.log("Appwrite Service :: GetFilePreview :: error ", error);
            return false;
        }
    }

}


const service = new Service();


export default service;