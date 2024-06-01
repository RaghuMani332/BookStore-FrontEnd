import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Book } from 'src/assets/BookObjectInterface';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {





private wishList=new BehaviorSubject<any>({});
wishListState=this.wishList.asObservable();
changeWishList(value:any)
{
  this.wishList.next(value);
}

private headerData=new BehaviorSubject<string>('');
headerDataState=this.headerData.asObservable();
  changeHeaderDataState(value:string)
  {
    this.headerData.next(value);
  }


  private allBookList=new BehaviorSubject<Book[]>([]);
  allBookState=this.allBookList.asObservable();
  changeAllBookList(value:Book[])
  {
    this.allBookList.next(value)
  }


  private orderBook=new BehaviorSubject<any>({});
  orderBookState=this.orderBook.asObservable();
  changeOrderBookState(value:any)
  {
    this.orderBook.next(value);
  }

  // private cartdetail=new BehaviorSubject<Number>(0);
  // cartdetailcurrentState=this.cartdetail.asObservable();
  // constructor() { }
  // cartdetailchangeState(value:Number)
  // {
  //   this.cartdetail.next(value);
  // }
  // ------------------------
  private tempCart=new BehaviorSubject<any>({});
  tempCartState=this.tempCart.asObservable();
  tempList:any=[];
  changeTempCart(value:any)
  {

    this.modifyCart(value)
  }
  // modifyCart(value:any)
  // {
    
  //     this.tempList=[...this.tempList].flat()
  //   if (this.tempList.find((item:any) => item.bookId === value[0].bookId) === undefined) 
  //     {
  //       this.tempList.push(value);
  //       this.tempCart.next(this.tempList);
  //     }
  //     else{
  //       this.tempList=this.tempList.filter((res:any)=>{
  //         if(!res.bookId==value.bookId)
  //           {
  //             return res;
  //           }
  //       })
  //       this.tempList.push(value);
  //       this.tempCart.next(this.tempList);
  //     }
    
  // }
  modifyCart(value: any[]) {
    // Flatten tempList if it's an array of arrays
    this.tempList = [...this.tempList].flat();

    // Iterate over each item in the value array
    for (const val of value) {
        // Check if any item in tempList has the same bookId as the current value
        const existingItem = this.tempList.find((item: any) => item.bookId === val.bookId);

        if (existingItem === undefined) {
            // If no item with the same bookId exists, add the new item to tempList
            this.tempList.push(val);
        } else {
            // If an item with the same bookId exists, update tempList
            this.tempList = this.tempList.map((item: any) => {
                // If the item's bookId matches, replace it with the new value
                if (item.bookId === val.bookId) {
                    return val;
                } else {
                    return item;
                }
            });
        }
    }

    // Update tempCart with the modified tempList
    this.tempCart.next(this.tempList);
}
clearLocalCart(val:any)
{
  console.log(this.tempList);
  
  var li=this.tempList.flat();
 this.tempList=li.filter((ele:any)=>
    {
      // ele=ele.flat();
      console.log(ele.bookId,ele);
      
      if(ele.bookId!=val.bookId)
        {
          return ele
        }
})
console.log(this.tempList);
this.tempCart.next(this.tempList);


}

//   modifyCart(value: any) {
//     value = { ...value }; // Ensure a new object reference
//     console.log(value[0].bookId);
    
//     const index = this.tempList.findIndex(item => item.bookId === value[0].bookId);
//     if (index === -1) {
//         // Book not found in tempList, add it
//         this.tempList.push(value);
//     } else {
//         // Book found in tempList, replace it
//         this.tempList[index] = value;
//     }
//     this.tempCart.next([...this.tempList]); // Emit a new reference of tempList
// }


}
