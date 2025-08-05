#!/bin/bash
# Set Android release keystore environment variables for Gradle signing
# Update the values below to match your keystore details

export MYAPP_UPLOAD_STORE_FILE="/Users/sf020-macbook-2029/Desktop/Prifina/android/app/release.keystore"
export MYAPP_UPLOAD_STORE_PASSWORD="your_store_password"
export MYAPP_UPLOAD_KEY_ALIAS="your_key_alias"
export MYAPP_UPLOAD_KEY_PASSWORD="your_key_password"

echo "Android keystore environment variables set."
