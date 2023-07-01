// import { createSlice } from '@reduxjs/toolkit'

// const initialState = {
//   email: "",
//   username: "",
//   name: "",
//   usercategory: "",
//   company: "",
//   tc: "",
//   note: "",
//   grpname:"",
//   sequence:"",
//   title:"",
//   menugroup1:"",
//   menugroup2:"",
//   menugroup3:"",
//   menugroup4:"",

// }

// export const userSlice = createSlice({
//   name: 'user_info',
//   initialState,
//   reducers: {
//     setUserInfo: (state, action) => {
//       state.email = action.payload.email
//       state.username = action.payload.username
//       state.name = action.payload.name
//       state.usercategory = action.payload.usercategory
//       state.company = action.payload.company
//       state.tc= action.payload.tc
//       state.note = action.payload.note
//       state.gprname = action.payload.gprname
//       state.seque = action.payload.seque
//       state.title = action.payload.title

//       state.menugroup1 = action.payload.menugroup1
//       state.menugroup2 = action.payload.menugroup2
//       state.menugroup3 = action.payload.menugroup3
//       state.menugroup4 = action.payload.menugroup4


//     },

//     unsetUserInfo: (state, action) => {
//       state.email = action.payload.email      
//       state.username = action.payload.username
//       state.name = action.payload.name
//       state.usercategory = action.payload.usercategory
//       state.company = action.payload.company
//       state.tc= action.payload.tc
//       state.note = action.payload.note     
//       state.gprname = action.payload.gprname
//       state.seque = action.payload.seque
//       state.title = action.payload.title
//       state.menugroup1 = action.payload.menugroup1
//       state.menugroup2 = action.payload.menugroup2
//       state.menugroup3 = action.payload.menugroup3
//       state.menugroup4 = action.payload.menugroup4


//     },
//   }
// })

// export const { setUserInfo, unsetUserInfo } = userSlice.actions

// export default userSlice.reducer



import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  email: "",
  username: "",
  company: "",
  user_code: "",
  menugroup1: "",
  menugroup2: "",
  menugroup3: "",
  menugroup4: "",
  menu_name1: "",
  menu_name2: "",
  menu_name3: "",
  menu_name4: "",
  menu_name5: "",
  menu_name6: "",
  menu_name7: "",
  menu_name8: "",
  menu_name9: "",
  task1: "",
  task2: "",
  task3: "",
  task4: "",
  task5: "",
  task6: "",
  task7: "",
  task8: "",
  task9: "",
  last_update_ip: ""

}

export const userSlice = createSlice({
  name: 'user_info',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.email = action.payload.email
      state.username = action.payload.username
      state.company = action.payload.company
      state.user_code = action.payload.user_code
      state.menugroup1 = action.payload.menugroup1
      state.menugroup2 = action.payload.menugroup2
      state.menugroup3 = action.payload.menugroup3
      state.menugroup4 = action.payload.menugroup4

      state.menu_name1 = action.payload.menu_name1
      state.menu_name2 = action.payload.menu_name2
      state.menu_name3 = action.payload.menu_name3
      state.menu_name4 = action.payload.menu_name4
      state.menu_name5 = action.payload.menu_name5
      state.menu_name6 = action.payload.menu_name6
      state.menu_name7 = action.payload.menu_name7
      state.menu_name8 = action.payload.menu_name8
      state.menu_name9 = action.payload.menu_name9
      state.task1 = action.payload.task1
      state.task2 = action.payload.task2
      state.task3 = action.payload.task3
      state.task4 = action.payload.task4
      state.task5 = action.payload.task5
      state.task6 = action.payload.task6
      state.task7 = action.payload.task7
      state.task8 = action.payload.task8
      state.task9 = action.payload.task9

      state.last_update_ip = action.payload.last_update_ip
    },

    unsetUserInfo: (state, action) => {
      state.email = action.payload.email
      state.username = action.payload.username
      state.company = action.payload.company
      state.user_code = action.payload.user_code
      state.menugroup1 = action.payload.menugroup1
      state.menugroup2 = action.payload.menugroup2
      state.menugroup3 = action.payload.menugroup3
      state.menugroup4 = action.payload.menugroup4
      state.menu_name1 = action.payload.menu_name1
      state.menu_name2 = action.payload.menu_name2
      state.menu_name3 = action.payload.menu_name3
      state.menu_name4 = action.payload.menu_name4
      state.menu_name5 = action.payload.menu_name5
      state.menu_name6 = action.payload.menu_name6
      state.menu_name7 = action.payload.menu_name7
      state.menu_name8 = action.payload.menu_name8
      state.menu_name9 = action.payload.menu_name9
      state.task1 = action.payload.task1
      state.task2 = action.payload.task2
      state.task3 = action.payload.task3
      state.task4 = action.payload.task4
      state.task5 = action.payload.task5
      state.task6 = action.payload.task6
      state.task7 = action.payload.task7
      state.task8 = action.payload.task8
      state.task9 = action.payload.task9

      state.last_update_ip = action.payload.last_update_ip

    },
  }
})

export const { setUserInfo, unsetUserInfo } = userSlice.actions

export default userSlice.reducer