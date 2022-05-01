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
 * Creates a Google Cloud Storage bucket.
 *
 * @see http://g.co/cloud/storage/docs/hosting-static-website#create-a-bucket
 */

import 'dotenv/config';
import { Storage } from '@google-cloud/storage';

// The ID of your GCS bucket
const bucketName = process.env.GOOGLE_CLOUD_BUCKET_NAME;

// The name of a storage class
// See the StorageClass documentation for other valid storage classes:
// https://googleapis.dev/java/google-cloud-clients/latest/com/google/cloud/storage/StorageClass.html
const storageClass = process.env.GOOGLE_CLOUD_BUCKET_STORAGE_CLASS;

// The name of a location
// See this documentation for other valid locations:
// http://g.co/cloud/storage/docs/locations#location-mr
const location = process.env.GOOGLE_CLOUD_BUCKET_LOCATION;

// Creates a client
// The bucket in the sample below will be created in the project associated with this client.
// For more information, please see https://cloud.google.com/docs/authentication/production or https://googleapis.dev/nodejs/storage/latest/Storage.html
const storage = new Storage();

async function createBucketWithStorageClassAndLocation() {
  // For default values see: https://cloud.google.com/storage/docs/locations and
  // https://cloud.google.com/storage/docs/storage-classes
  const [bucket] = await storage.createBucket(bucketName, {
    location,
    [storageClass]: true,
  });

  console.log(
    `${bucket.name} created with ${storageClass} class in ${location}`
  );
}

createBucketWithStorageClassAndLocation().catch(console.error);
