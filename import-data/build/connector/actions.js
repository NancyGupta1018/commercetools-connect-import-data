"use strict";
// import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
// const CART_UPDATE_EXTENSION_KEY = 'myconnector-cartUpdateExtension';
// const CART_DISCOUNT_TYPE_KEY = 'myconnector-cartDiscountType';
// export async function createCartUpdateExtension(
//   apiRoot: ByProjectKeyRequestBuilder,
//   applicationUrl: string
// ): Promise<void> {
//   const {
//     body: { results: extensions },
//   } = await apiRoot
//     .extensions()
//     .get({
//       queryArgs: {
//         where: `key = "${CART_UPDATE_EXTENSION_KEY}"`,
//       },
//     })
//     .execute();
//   if (extensions.length > 0) {
//     const extension = extensions[0];
//     await apiRoot
//       .extensions()
//       .withKey({ key: CART_UPDATE_EXTENSION_KEY })
//       .delete({
//         queryArgs: {
//           version: extension.version,
//         },
//       })
//       .execute();
//   }
//   await apiRoot
//     .extensions()
//     .post({
//       body: {
//         key: CART_UPDATE_EXTENSION_KEY,
//         destination: {
//           type: 'HTTP',
//           url: applicationUrl,
//         },
//         triggers: [
//           {
//             resourceTypeId: 'cart',
//             actions: ['Update'],
//           },
//         ],
//       },
//     })
//     .execute();
// }
// export async function deleteCartUpdateExtension(
//   apiRoot: ByProjectKeyRequestBuilder
// ): Promise<void> {
//   const {
//     body: { results: extensions },
//   } = await apiRoot
//     .extensions()
//     .get({
//       queryArgs: {
//         where: `key = "${CART_UPDATE_EXTENSION_KEY}"`,
//       },
//     })
//     .execute();
//   if (extensions.length > 0) {
//     const extension = extensions[0];
//     await apiRoot
//       .extensions()
//       .withKey({ key: CART_UPDATE_EXTENSION_KEY })
//       .delete({
//         queryArgs: {
//           version: extension.version,
//         },
//       })
//       .execute();
//   }
// }
// export async function createCustomCartDiscountType(
//   apiRoot: ByProjectKeyRequestBuilder
// ): Promise<void> {
//   const {
//     body: { results: types },
//   } = await apiRoot
//     .types()
//     .get({
//       queryArgs: {
//         where: `key = "${CART_DISCOUNT_TYPE_KEY}"`,
//       },
//     })
//     .execute();
//   if (types.length > 0) {
//     const type = types[0];
//     await apiRoot
//       .types()
//       .withKey({ key: CART_DISCOUNT_TYPE_KEY })
//       .delete({
//         queryArgs: {
//           version: type.version,
//         },
//       })
//       .execute();
//   }
//   await apiRoot
//     .types()
//     .post({
//       body: {
//         key: CART_DISCOUNT_TYPE_KEY,
//         name: {
//           en: 'Custom type to store a string',
//         },
//         resourceTypeIds: ['cart-discount'],
//         fieldDefinitions: [
//           {
//             type: {
//               name: 'String',
//             },
//             name: 'customCartField',
//             label: {
//               en: 'Custom cart field',
//             },
//             required: false,
//           },
//         ],
//       },
//     })
//     .execute();
// }
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb25uZWN0b3IvYWN0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsa0pBQWtKO0FBRWxKLHVFQUF1RTtBQUN2RSxpRUFBaUU7QUFFakUsbURBQW1EO0FBQ25ELHlDQUF5QztBQUN6QywyQkFBMkI7QUFDM0IscUJBQXFCO0FBQ3JCLFlBQVk7QUFDWixxQ0FBcUM7QUFDckMsc0JBQXNCO0FBQ3RCLG9CQUFvQjtBQUNwQixhQUFhO0FBQ2IscUJBQXFCO0FBQ3JCLHlEQUF5RDtBQUN6RCxXQUFXO0FBQ1gsU0FBUztBQUNULGtCQUFrQjtBQUVsQixpQ0FBaUM7QUFDakMsdUNBQXVDO0FBRXZDLG9CQUFvQjtBQUNwQixzQkFBc0I7QUFDdEIscURBQXFEO0FBQ3JELGtCQUFrQjtBQUNsQix1QkFBdUI7QUFDdkIsd0NBQXdDO0FBQ3hDLGFBQWE7QUFDYixXQUFXO0FBQ1gsb0JBQW9CO0FBQ3BCLE1BQU07QUFFTixrQkFBa0I7QUFDbEIsb0JBQW9CO0FBQ3BCLGNBQWM7QUFDZCxnQkFBZ0I7QUFDaEIsMENBQTBDO0FBQzFDLHlCQUF5QjtBQUN6QiwwQkFBMEI7QUFDMUIsaUNBQWlDO0FBQ2pDLGFBQWE7QUFDYixzQkFBc0I7QUFDdEIsY0FBYztBQUNkLHNDQUFzQztBQUN0QyxtQ0FBbUM7QUFDbkMsZUFBZTtBQUNmLGFBQWE7QUFDYixXQUFXO0FBQ1gsU0FBUztBQUNULGtCQUFrQjtBQUNsQixJQUFJO0FBRUosbURBQW1EO0FBQ25ELHdDQUF3QztBQUN4QyxxQkFBcUI7QUFDckIsWUFBWTtBQUNaLHFDQUFxQztBQUNyQyxzQkFBc0I7QUFDdEIsb0JBQW9CO0FBQ3BCLGFBQWE7QUFDYixxQkFBcUI7QUFDckIseURBQXlEO0FBQ3pELFdBQVc7QUFDWCxTQUFTO0FBQ1Qsa0JBQWtCO0FBRWxCLGlDQUFpQztBQUNqQyx1Q0FBdUM7QUFFdkMsb0JBQW9CO0FBQ3BCLHNCQUFzQjtBQUN0QixxREFBcUQ7QUFDckQsa0JBQWtCO0FBQ2xCLHVCQUF1QjtBQUN2Qix3Q0FBd0M7QUFDeEMsYUFBYTtBQUNiLFdBQVc7QUFDWCxvQkFBb0I7QUFDcEIsTUFBTTtBQUNOLElBQUk7QUFFSixzREFBc0Q7QUFDdEQsd0NBQXdDO0FBQ3hDLHFCQUFxQjtBQUNyQixZQUFZO0FBQ1osZ0NBQWdDO0FBQ2hDLHNCQUFzQjtBQUN0QixlQUFlO0FBQ2YsYUFBYTtBQUNiLHFCQUFxQjtBQUNyQixzREFBc0Q7QUFDdEQsV0FBVztBQUNYLFNBQVM7QUFDVCxrQkFBa0I7QUFFbEIsNEJBQTRCO0FBQzVCLDZCQUE2QjtBQUU3QixvQkFBb0I7QUFDcEIsaUJBQWlCO0FBQ2pCLGtEQUFrRDtBQUNsRCxrQkFBa0I7QUFDbEIsdUJBQXVCO0FBQ3ZCLG1DQUFtQztBQUNuQyxhQUFhO0FBQ2IsV0FBVztBQUNYLG9CQUFvQjtBQUNwQixNQUFNO0FBRU4sa0JBQWtCO0FBQ2xCLGVBQWU7QUFDZixjQUFjO0FBQ2QsZ0JBQWdCO0FBQ2hCLHVDQUF1QztBQUN2QyxrQkFBa0I7QUFDbEIsaURBQWlEO0FBQ2pELGFBQWE7QUFDYiw4Q0FBOEM7QUFDOUMsOEJBQThCO0FBQzlCLGNBQWM7QUFDZCxzQkFBc0I7QUFDdEIsZ0NBQWdDO0FBQ2hDLGlCQUFpQjtBQUNqQix1Q0FBdUM7QUFDdkMsdUJBQXVCO0FBQ3ZCLHlDQUF5QztBQUN6QyxpQkFBaUI7QUFDakIsK0JBQStCO0FBQy9CLGVBQWU7QUFDZixhQUFhO0FBQ2IsV0FBVztBQUNYLFNBQVM7QUFDVCxrQkFBa0I7QUFDbEIsSUFBSSJ9