package servlet;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import com.mysql.jdbc.Driver;

/**
 * Servlet implementation class Pagination
 */
@WebServlet("/Pagination")
public class Pagination extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Pagination() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String url = "jdbc:mysql://localhost:3306/test";
		List<Message> list = new ArrayList<Message>();
		try {
			Driver.class.forName("com.mysql.jdbc.Driver");
			Connection con = DriverManager.getConnection(url,"root","root");
			Statement stmt = con.createStatement();
			String sql = "select * from message";
			ResultSet rs=stmt.executeQuery(sql);
			while(rs.next()){
				Message message = new Message();
				message.setId(rs.getInt(1));
				message.setUser(rs.getString(2));
				list.add(message);
			}
			
		} catch (Exception e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		JSONArray result = JSONArray.fromObject(list);
		response.getWriter().print(result);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String url = "jdbc:mysql://localhost:3306/test";
		List<Message> list = new ArrayList<Message>();
		PageUtil page = null;
		try {
			Driver.class.forName("com.mysql.jdbc.Driver");
			Connection con = DriverManager.getConnection(url,"root","root");
			Statement stmt = con.createStatement();
			
			
			int curPage = Integer.parseInt(request.getParameter("pageNum"));
			int pageSize = Integer.parseInt(request.getParameter("pageSize"));
			
			String sql = "select * from message limit " + (curPage - 1) * pageSize + "," + pageSize;
			ResultSet rs=stmt.executeQuery(sql);
			while(rs.next()){
				Message message = new Message();
				message.setId(rs.getInt(1));
				message.setUser(rs.getString(2));
				list.add(message);
			}
			
			page = new PageUtil(pageSize, 26, curPage, list);
			
			con.close();
			stmt.close();
		} catch (Exception e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		JSONObject json = JSONObject.fromObject(page);
		response.getWriter().print(json);
		
	}

}
