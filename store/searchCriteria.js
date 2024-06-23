export const useSearchCriteriaStore = defineStore('searchCriteria', () => {
  const selected = ref([])
  const excluded = ref([])
  const searchResultsList = ref([])

  function setSelectedList(data) {
    selected.value = data
  }
  function setExcludedList(data) {
    excluded.value = data
  }

  function removeSelectedTag(tag) {
    selected.value = selected.value.filter(item => item !== tag)
  }

  function removeExcludedHashtag(tag) {
    excluded.value = excluded.value.filter(item => item !== tag)
  }

  function updateSearchResultsList(userId, updateKey) {
    searchResultsList.value = searchResultsList.value.map((item) => {
      if (item.userInfo._id === userId)
        return { ...item, ...updateKey }
      return item
    })
  }

  function updateSearchResultsListCommentsCount(userId) {
    searchResultsList.value = searchResultsList.value.map((item) => {
      if (item.userInfo._id === userId) {
        return {
          ...item,
          hasComment: false,
          profile: {
            ...item.profile,
            userStatus: {
              ...item.profile.userStatus,
              commentCount: item.profile.userStatus.commentCount - 1,
            },
          },
        }
      }
      return item
    })
  }

  return {
    selected,
    excluded,
    searchResultsList,
    setSelectedList,
    setExcludedList,
    removeSelectedTag,
    removeExcludedHashtag,
    updateSearchResultsList,
    updateSearchResultsListCommentsCount,
  }
}, {
  persist: {
    storage: persistedState.localStorage,
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useSearchCriteriaStore, import.meta.hot))
