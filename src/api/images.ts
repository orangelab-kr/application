import {CommonResponse} from '../models/common';
import {createClient} from './client';

export type ResponseImagesUpload = CommonResponse<{url: string}>;

export class ImagesClient {
  private static client = createClient('images');

  public static async upload(image: {
    uri: string;
    name: string;
  }): Promise<ResponseImagesUpload> {
    const formData = new FormData();
    formData.append('image', {
      uri: image.uri,
      name: image.name,
      type: 'image/jpeg',
    });

    const headers = {'Content-Type': 'multipart/form-data'};
    return this.client
      .post('/', formData, {headers, transformRequest: r => r})
      .then(r => r.data);
  }
}
