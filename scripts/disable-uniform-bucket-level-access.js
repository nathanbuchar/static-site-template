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
 * This application demonstrates how to perform basic operations on buckets with
 * the Google Cloud Storage API.
 *
 * For more information, see the README.md under /storage and the documentation
 * at https://cloud.google.com/storage/docs.
 */

require('dotenv/config');

const { Storage } = require('@google-cloud/storage');

// The ID of your GCS bucket
const bucketName = process.env.GOOGLE_CLOUD_BUCKET_NAME;

// Creates a client
const storage = new Storage();

async function disableUniformBucketLevelAccess() {
  await storage.bucket(bucketName).setMetadata({
    iamConfiguration: {
      uniformBucketLevelAccess: {
        enabled: false,
      },
    },
  });

  console.log(`Uniform bucket-level access was disabled for ${bucketName}.`);
}

disableUniformBucketLevelAccess().catch(console.error);
