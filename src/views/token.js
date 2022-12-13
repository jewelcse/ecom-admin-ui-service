const value = JSON.parse(localStorage.getItem('admin_state'))
export const token = value?.access_token
