package org.taidi.gestion_entrees;

import java.text.SimpleDateFormat;
import java.util.Calendar;

public class Test {

    public static void main(String[] args){
        Calendar cal = Calendar.getInstance();

        // get start of this week in milliseconds
        cal.set(Calendar.DAY_OF_WEEK, cal.getFirstDayOfWeek());
        System.out.println("Start of this week:       " + new SimpleDateFormat("dd/MM/YYYY").format(cal.getTime()));
        //.set(Calendar.DAY_OF_WEEK, cal.get);
        cal.add(Calendar.DATE, 6);
        System.out.println("end of this week:      " + new SimpleDateFormat("dd/MM/YYYY").format(cal.getTime()));
    }

}
