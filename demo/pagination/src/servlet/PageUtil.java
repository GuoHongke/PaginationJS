package servlet;

import java.util.List;

public class PageUtil {
	 private int pageSize;
	 private int pageCount;
	 private int pageIndex;
	 private List<Message> pageData;
	 
	 public PageUtil(int pageSize, int pageCount, int pageIndex, List<Message> pageData){
		 this.pageSize = pageSize;
		 this.pageCount = pageCount;
		 this.pageIndex = pageIndex;
		 this.pageData = pageData;
	 }
	 
	 public PageUtil(int pageSize, int pageCount, int pageNum){
		 this.pageSize = pageSize;
		 this.pageCount = pageCount;
		 this.pageIndex = pageNum;
	 }

	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	public int getpageCount() {
		return pageCount;
	}

	public void setpageCount(int pageCount) {
		this.pageCount = pageCount;
	}

	public int getPageIndex() {
		return pageIndex;
	}

	public void setPageIndex(int pageIndex) {
		this.pageIndex = pageIndex;
	}

	public List<Message> getPageData() {
		return pageData;
	}

	public void setPageData(List<Message> pageData) {
		this.pageData = pageData;
	}
	 
	 
	 
}
