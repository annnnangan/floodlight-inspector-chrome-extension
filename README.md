# Floodlight Inspector Chrome Extension

<a href="https://chromewebstore.google.com/detail/floodlight-inspector/klidijcbfmpkdnegfcfkcdjfkimggbed?authuser=1&hl=en" target="_blank">Add Chrome Extension</a>

![image.png](https://firebasestorage.googleapis.com/v0/b/testing-c9537.appspot.com/o/Floodlight-inspector%2FMarquee%20promo%20tile.png?alt=media&token=ad89d971-d25b-4783-abf4-d9e6457c264e)


The **Floodlight Inspector** Chrome extension is a powerful tool designed to help you easily validate and troubleshoot your Floodlight setup in Google tag format. 

You may use the <a href="https://annnnangan.github.io/demo-page-for-floodlight-inspector-chrome-extension/" target="_blank">demo page</a> to have a try on the Floodlight Inspector chrome extension later. The below guideline is based on this demo page too. 


## Key Features

- **Retain the necessary Floodlight pings to avoid confusion**
    - When checking Floodlight on the network tab, we usually see different ping being triggered with the same action. It causes confusion as we will be confused on which pings we should refer to. With this tool, we only filter out the Floodlight ping that you need to audit on.
    - For example,
        - the only ping that need to review is highlighted below but “fledge=1” and “register_conversion” are also appeared at the same time.
        
            ![image.png](https://firebasestorage.googleapis.com/v0/b/testing-c9537.appspot.com/o/Floodlight-inspector%2Ffloodlight-inspector-2.png?alt=media&token=e9a893b1-72ad-4477-98d1-dfdef34d10aa)

        - Our tool only capture the ping that you need to review.
            ![image.png](https://firebasestorage.googleapis.com/v0/b/testing-c9537.appspot.com/o/Floodlight-inspector%2Ffloodlight-inspector-3.png?alt=media&token=2247467e-698d-4267-adce-0398438785e4)

           
            
- **Breaks down Floodlight URLs**
    - It deconstructs the Floodlight request URLs to make it easier for you to identify and verify the data, ensuring that everything is set up correctly.
    ![image.png](https://firebasestorage.googleapis.com/v0/b/testing-c9537.appspot.com/o/Floodlight-inspector%2Ffloodlight-inspector-4.png?alt=media&token=d21117fc-2927-4668-95fd-4888158103ad)
        
       
        
- **Custom Floodlight variable decoding**
    - This tool decodes the custom Floodlight variables so they’re understandable when your captured language isn't in English.
    ![image.png](https://firebasestorage.googleapis.com/v0/b/testing-c9537.appspot.com/o/Floodlight-inspector%2Ffloodlight-inspector-5.png?alt=media&token=2d6ef341-acda-4916-9d4d-1201b64d1648)
   
    

## Step by Step Guidelines

1. Add this chrome extension tool to your Google Chrome 
2. On the website that you want to audit the Floodlight tag, right click > select inspector. 
    ![image.png](https://firebasestorage.googleapis.com/v0/b/testing-c9537.appspot.com/o/Floodlight-inspector%2Ffloodlight-inspector-6.png?alt=media&token=65f48e51-1e74-43b0-9821-37e7f8e3def6)
        
        
3. Switch to the “Floodlight Inspector” tab
    ![image.png](https://firebasestorage.googleapis.com/v0/b/testing-c9537.appspot.com/o/Floodlight-inspector%2Ffloodlight-inspector-7.png?alt=media&token=61bf2799-b3aa-456c-a537-f22dde91e8a6)
        
       
        
4. Trigger your Floodlight tag and the Floodlight tag will appear on the tool
5. Expand the accordion 
    ![image.png](https://firebasestorage.googleapis.com/v0/b/testing-c9537.appspot.com/o/Floodlight-inspector%2Ffloodlight-inspector-8.png?alt=media&token=1f7b5b07-6a57-4009-815c-124e571db11e)
        
       
        
6. Review the Floodlight information in the Event Data accordion 
    ![image.png](https://firebasestorage.googleapis.com/v0/b/testing-c9537.appspot.com/o/Floodlight-inspector%2Ffloodlight-inspector-11.png?alt=media&token=b7408a03-1473-41bf-ae46-3fde76f1f50b)
        
       
        
7. You could review the original request in the Full Request URL accordion
    ![image.png](https://firebasestorage.googleapis.com/v0/b/testing-c9537.appspot.com/o/Floodlight-inspector%2Ffloodlight-inspector-9.png?alt=media&token=4028566c-446e-4ea9-9eb7-c98853e2f3c8)
        
       
        
8. You could reload the page and clear all the pings by clicking the “Reload and Clear” button
9. You could clear all the pings by clicking the “Clear Button”
10. The new triggered Floodlight tag will appear below the existing one
    ![image.png](https://firebasestorage.googleapis.com/v0/b/testing-c9537.appspot.com/o/Floodlight-inspector%2Ffloodlight-inspector-10.png?alt=media&token=f97eab0f-597e-4750-8a3b-7ce08a24585d)
        

## Privacy Policy for My Google Chrome Extensions  
**Effective Date:** 23rd Nov, 2024

### Data Collection and Use  
My Google Chrome Extensions do not collect, store, or transmit any personal information from users. No data that can personally identify you—such as your name, email address, or location—is gathered or shared.  

Since no data is collected, your information is not sold, shared, or otherwise disclosed to third parties.  

### Third-Party Websites  
My Google Chrome Extensions may include links to external websites or services that are not operated by me. Please note that this Privacy Policy does not apply to those third-party websites or services. I encourage you to review the privacy policies of any external sites you visit to understand how they handle personal information.  

### Changes to This Privacy Policy  
I reserve the right to update this Privacy Policy at any time. Changes will take effect immediately upon being posted here, with the "Effective Date" updated accordingly. I encourage you to check this page periodically to stay informed about how your privacy is protected.  

### Consent  
By using my Google Chrome Extensions, you consent to this Privacy Policy. If you do not agree to its terms, please discontinue using the extensions.  
