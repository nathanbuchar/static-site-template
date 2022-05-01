#!/usr/bin/node

// Copyright 2020 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * Publishes assets to a Google Cloud Storage bucket.
 *
 * @see http://g.co/cloud/storage/docs/hosting-static-website#storage-upload-object-nodejs
 * @see https://github.com/googleapis/nodejs-storage/blob/main/samples/uploadDirectory.js
 */

require('dotenv/config');

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const { Storage } = require('@google-cloud/storage');

// The ID of your GCS bucket
const bucketName = process.env.GOOGLE_CLOUD_BUCKET_NAME;

// The path to your file to upload
const directoryPath = process.env.GOOGLE_CLOUD_UPLOAD_DIRECTORY_PATH;

// Creates a client
const storage = new Storage();

const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

async function* getFiles(dir) {
  for (const file of await readdir(dir)) {
    const fullPath = path.join(dir, file);
    const stats = await stat(fullPath);

    if (stats.isDirectory()) {
      yield* getFiles(fullPath);
    }

    if (stats.isFile()) {
      yield fullPath;
    }
  }
}

async function uploadDirectory() {
  const bucket = storage.bucket(bucketName);
  let successfulUploads = 0;

  for await (const filePath of getFiles(directoryPath)) {
    try {
      const destination = path.relative(directoryPath, filePath);
      await bucket.upload(filePath, { destination });

      console.log(`Successfully uploaded: ${filePath}`);
      successfulUploads++;
    } catch (err) {
      console.error(`Error uploading ${filePath}:`, err);
    }
  }

  console.log(
    `${successfulUploads} files uploaded to ${bucketName} successfully.`
  );
}

uploadDirectory().catch(console.error);
